import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';
import { AuthDialogComponent } from '../share/auth-dialog/auth-dialog.component';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements AfterViewInit, OnDestroy {
  isNavbarFixed: boolean = false;
  isUserAuthenticated$: Observable<Boolean> = this.authService.isAuthenticatedUser$;
  userInfo$: Observable<User> = this.authService.userId$.pipe(switchMap(id => {
    if (!id) { return of(null)}
    return this.api.getUserById(id);
  }));

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    if (!this.authService.isAuthenticatedUser()) {
      this.authService.verifyTokenIfExists();
    }
  }

  clickToLogin(): void {
    this.dialog.open(AuthDialogComponent).afterClosed()
      .subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authService.unsubrcibe();
  }
}
