import { Component, inject } from '@angular/core';
import { GetProductAddition, GetProductArrange, GetProductForInvoice } from 'src/app/models/product.model';
import { GeneralService } from 'src/app/services/general.service';
import { ProductActionService } from 'src/app/services/product-action.service';

@Component({
  selector: 'app-pos-product',
  templateUrl: './pos-product.component.html',
  styleUrls: ['./pos-product.component.css']
})
export class PosProductComponent {

  #productAction = inject(ProductActionService)
  #general = inject(GeneralService)

  products$ = this.#productAction.productForInvoice$
  selectedArrange: GetProductArrange;
  additions: GetProductAddition[] = [];
  isOther$ = this.#general.isOther$;
  showAddition$ = this.#general.showAddition$;
  showArrange$ = this.#general.showArrange$;

  addToCart(product: GetProductForInvoice) {

  }

}
