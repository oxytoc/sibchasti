import { AfterViewInit, Injectable } from '@angular/core';
import { LoginInterface, SignUp, User } from '../interfaces';
import { BehaviorSubject, catchError, Observable, of, Subject, Subscription, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokensAndUser {
  tokens: Tokens;
  userId: string;
  username: string;
}

@Injectable()
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticatedUser$ = this._isAuthenticated.asObservable();

  private _userId = new BehaviorSubject<string>(null);
  userId$ = this._userId.asObservable();

  private _username = new BehaviorSubject<string>(null);
  username$ = this._username.asObservable();

  private authSecretKey = 'Bearer Token';
  private authRefreshSecretKey = 'Bearer Refresh Token';
  private baseUrl = 'http://localhost:3000/api';

  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
  }
  
  login(loginObject: LoginInterface): Observable<any> {
    const path = this.baseUrl + '/auth/login';
    return this.http.post<TokensAndUser>(path, loginObject).pipe(
      tap(tokensAndUser => {
        localStorage.setItem(this.authSecretKey, tokensAndUser.tokens.accessToken);
        localStorage.setItem(this.authRefreshSecretKey, tokensAndUser.tokens.refreshToken);
        this._userId.next(tokensAndUser.userId)
        this._username.next(tokensAndUser.username)
        this._isAuthenticated.next(true);
      }),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    )
  }

  signUp(signUpObject: SignUp): Observable<any> {
    const path = this.baseUrl + '/auth/signUp';
    return this.http.post<TokensAndUser>(path, signUpObject).pipe(
      tap(tokensAndUser => {
        localStorage.setItem(this.authSecretKey, tokensAndUser.tokens.accessToken);
        localStorage.setItem(this.authRefreshSecretKey, tokensAndUser.tokens.refreshToken);
        this._userId.next(tokensAndUser.userId)
        this._username.next(tokensAndUser.username)
        this._isAuthenticated.next(true);
      }),
      catchError(error => {
        console.log(error);
        return of(error);
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this._isAuthenticated.getValue();
  }

  getAuthorizationToken(): string {
    return localStorage.getItem(this.authSecretKey);
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem(this.authRefreshSecretKey);
    this._isAuthenticated.next(false);
    this._userId.next(null)
    this._username.next(null)
    this.unsubrcibe();
    this.router.navigate(['/']);
  }

  refreshAccessToken(): Observable<any> {
    // Call the refresh token endpoint to get a new access token
    const path = this.baseUrl + '/auth/refresh';
    const refreshToken = localStorage.getItem(this.authRefreshSecretKey);
    const refreshObject = {
      refreshToken,
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

  verifyToken(token: string): Observable<TokensAndUser> {
    const path = this.baseUrl + '/auth/verifyToken';
    return this.http.post<TokensAndUser>(path, { accessToken: token }).pipe(
      catchError(error => {
        console.log(error);
        return this.refreshAccessToken();
      })
    );
  }

  verifyTokenIfExists(): void {
    const token = localStorage.getItem(this.authSecretKey);
    if (!!token) {
      this.subscription.add(this.verifyToken(token).subscribe(tokens => {
        this._userId.next(tokens.userId)
        this._username.next(tokens.username)
        this._isAuthenticated.next(true);
      }))
    }
  }

  unsubrcibe(): void {
    this.subscription.unsubscribe();
  }
}
