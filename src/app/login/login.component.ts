import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginBranchDto } from '../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    })
  }
  onSubmit() {
    // if (this.loginForm.invalid) return;
    this._authService.firstLogin(this.loginForm.value)
      .subscribe({
        next: (userResponse) => {
          console.log(userResponse);

          if(userResponse.treasuries.length <= 1) {
            let login: LoginBranchDto = {
              treasuryId: userResponse.treasuries[0]?.treasuryId,
              userId: userResponse.userId
            }
            this._authService.choseTreasure(userResponse?.treasuries[0])
            this._authService.login(login).subscribe({
              next: (res) => {
                localStorage.setItem('activeUser', res?.user?.name)
                this.router.navigate(['pos']);
              }
            })
          } else {
            this.router.navigate(['/branches']);
          }
        },
        error: (err) => {
        }
      })
  }

}
