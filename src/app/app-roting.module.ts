import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { isSignInGuard } from './core/guard/is-sign-in.guard';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent,
   canActivate: [isSignInGuard]
  },
  {
    path: 'pos',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./shell/shell.module')
        .then(m => m.ShellModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
