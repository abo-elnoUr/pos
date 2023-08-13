import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosShellComponent } from './pos-shell/pos-shell.component';

const routes: Routes = [
  {
    path: '',
    component: PosShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
