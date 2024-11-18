import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { filter } from 'rxjs';


export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticatedUser()
    ? true
    : inject(MatDialog).open(AuthDialogComponent).afterClosed()
      .pipe(filter((isAuthenticated) => !!isAuthenticated))
};
