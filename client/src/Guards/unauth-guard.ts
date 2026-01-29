import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth-service';

export const unauthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    return false;
  }
  return true;

};
