import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/signin']);
  return false;
};
