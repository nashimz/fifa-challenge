import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const BrowserAuthGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // Skip guard logic entirely on server (allow navigation)
  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }

  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => {
      if (isAuth) {
        return true;
      } else {
        // Redirect to login page or another page if NOT authenticated
        return router.parseUrl('/not-authorized'); // or '/not-authorized'
      }
    })
  );
};
