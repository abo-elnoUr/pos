import { Injectable, signal } from '@angular/core';
import { Login, LoginBranchDto, LoginResponse, LoginResponseWithTreasury, TokenResponse } from '../models/auth.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  currentUser$: BehaviorSubject<TokenResponse | null> = new BehaviorSubject(this.token);

  get token(): TokenResponse | null {
    const user = localStorage.getItem("laundryUser");
    if(user) {
      return JSON.parse(user) as TokenResponse
    }
    return null;
  }

  get currentUserValue(): TokenResponse | null{
    return this.currentUser$.value;
  }

  userId$ = new BehaviorSubject<string>("");
  private treasures$ = new BehaviorSubject<LoginResponseWithTreasury[]>([]);
  listOfTreasures$ = this.treasures$.asObservable();

  private userTreasureSubject = new BehaviorSubject<LoginResponseWithTreasury>(null);
  userData$ = this.userTreasureSubject.asObservable();

  choseTreasure(treasure: LoginResponseWithTreasury) {
    this.userTreasureSubject.next(treasure);
    localStorage.setItem("branchName", treasure?.branchName);
    localStorage.setItem("branchNameAr", treasure?.branchNameAr);
    localStorage.setItem("treasuryName", treasure?.treasuryName);
  }

  firstLogin(credentials: Login) {
    return this.http
      .post<LoginResponse>( `${environment.ApiUrl}/Accounts/FirstLogin`, credentials)
       .pipe(
        tap((res) => {
          this.userId$.next(res.userId);
          this.treasures$.next(res.treasuries);
        })
      );
  }

  login(credentials: LoginBranchDto) {
    return this.http
      .post<TokenResponse>( `${environment.ApiUrl}/Accounts/Login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem("laundryUser", JSON.stringify(res));
          this.currentUser$.next(res);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => new Error());
        })
      );
  }


  logout() {
    localStorage.removeItem("laundryUser");
    localStorage.clear();
    this.currentUser$.next(null);
    this.router.navigate(["login"]);
  }

}
