import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { PosShellComponent } from './pos-shell/pos-shell.component';
import { ClientComponent } from './pos-shell/client/client.component';
import { PosCategoryComponent } from './pos-shell/pos-category/pos-category.component';
import { PosSubCategoryComponent } from './pos-shell/pos-sub-category/pos-sub-category.component';
import { PosProductComponent } from './pos-shell/pos-product/pos-product.component';
import { CartComponent } from './pos-shell/cart/cart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PosShellComponent,
    ClientComponent,
    PosCategoryComponent,
    PosSubCategoryComponent,
    PosProductComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShellModule { }
