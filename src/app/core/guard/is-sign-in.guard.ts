import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

export const isSignInGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  const isSignedIn = authService.currentUserValue && authService.currentUserValue.token;
      if(isSignedIn){
        router.navigateByUrl('/pos');
        return false;
      }
    return true;
};
