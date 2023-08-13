import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  const currentUser = authService.currentUserValue
  if( currentUser ){
    return true;
  }
  router.navigateByUrl('/login');
  return false
}
