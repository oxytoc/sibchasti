import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { filter, map, of, switchMap } from 'rxjs';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const dialog = inject(MatDialog);

  return authService.verifyTokenIfExists$().pipe(
    switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return of(true);
      }
      return dialog.open(AuthDialogComponent).afterClosed()
      .pipe(filter((isAuthenticated) => !!isAuthenticated))
    })
  );
};
