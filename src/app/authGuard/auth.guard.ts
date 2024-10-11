import { PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      return true;
    } else {
      router.navigate(['/login']); 
      return false;
    }
  }

  return false; 
};
