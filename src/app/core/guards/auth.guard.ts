import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StrapiService } from '../services/strapi.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const strapiService = inject(StrapiService);
  const router = inject(Router);

  if (strapiService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
