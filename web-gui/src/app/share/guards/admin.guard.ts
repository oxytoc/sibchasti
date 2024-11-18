import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { map, of, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Role } from '../../interfaces';


export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const apiService = inject(ApiService);

  return authService.isAuthenticatedUser$.pipe(
    switchMap(isAuth => {
      if (!isAuth) { return of(false); }
      return authService.userId$.pipe(
        switchMap(id => apiService.getUserById(id)),
        map(user => user.role === Role.admin)
      )
    }),
  )
};
