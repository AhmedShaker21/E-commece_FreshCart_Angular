import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      localStorage.setItem('navigateTo', state.url);  // save the current page to localStorage
      router.navigate(['/login']);
      return false;
    }
  }
  else {
    return false;
  }
};
