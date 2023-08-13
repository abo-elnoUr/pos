import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  #authService = inject(AuthService)

  constructor() {}
  language = localStorage.getItem('lang');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = this.#authService.currentUserValue
    let expirationDate = new Date(currentUser.expiration);
        if(expirationDate <= new Date()) {
          this.#authService.logout()
        }
        request = request.clone({
          setHeaders: {
            Authorization : `Bearer ${currentUser.token}`,
            'Accept-language': this.language == 'ar' ? 'ar' : 'en'
          }
        })
    return next.handle(request);
  }
}
