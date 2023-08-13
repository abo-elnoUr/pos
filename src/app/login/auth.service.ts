import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/auth.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  currentUser$: BehaviorSubject<TokenResponse> = new BehaviorSubject(
    JSON.parse(localStorage.getItem("laundryUser")) ?? null
  );

  get currentUserValue(): TokenResponse {
    return this.currentUser$.value;
  }









  logout() {
    localStorage.removeItem("laundryUser");
    localStorage.clear();
    this.currentUser$.next(null);
    this.router.navigate(["login"]);
  }

}
