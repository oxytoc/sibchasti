import { Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';
  private authRefreshSecretKey = 'Bearer Refresh Token';
  private baseUrl = 'http://localhost:3000/api';
  private username: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }
  
  login(loginObject: LoginInterface): Observable<any> {
    const path = this.baseUrl + '/auth/login';
    return this.http.post<{ accessToken: string, refreshToken: string }>(path, loginObject).pipe(
      tap(authToken => {
        localStorage.setItem(this.authSecretKey, authToken.accessToken);
        localStorage.setItem(this.authRefreshSecretKey, authToken.refreshToken);
        this.isAuthenticated = true;
        this.username = loginObject.username;
        return this.router.navigate(['/admin']);
      }),
      catchError(error => {
        console.log(error);
        return error;
      })
    )
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getAuthorizationToken(): string {
    return `${localStorage.getItem(this.authSecretKey)}`;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem(this.authRefreshSecretKey);
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  refreshAccessToken(): Observable<any> {
    // Call the refresh token endpoint to get a new access token
    const path = this.baseUrl + '/auth/refresh';
    const refreshToken = localStorage.getItem(this.authRefreshSecretKey);
    const refreshObject = {
      refreshToken,
      username: this.username,
    }
    return this.http.post<any>(path, refreshObject).pipe(
      tap((response) => {
        // Update the access token in the local storage
        localStorage.setItem(this.authSecretKey, response.accessToken);
        localStorage.setItem(this.authRefreshSecretKey, response.refreshToken);
      }),
      catchError((error) => {
        // Handle refresh token error (e.g., redirect to login page)
        console.error('Error refreshing access token:', error);
        this.logout();
        return throwError(error);
      })
    );
  }
}
