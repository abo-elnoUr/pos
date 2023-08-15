import { Component, inject } from '@angular/core';
import { GetProductAddition, GetProductArrange, GetProductForInvoice, Product } from 'src/app/models/product.model';
import { CartActionService } from 'src/app/services/cart-action.service';
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
  #cartAction = inject(CartActionService)

  products$ = this.#productAction.productForInvoice$
  selectedArrange: GetProductArrange
  additions: GetProductAddition[] = []
  isOther$ = this.#general.isOther$
  showAddition$ = this.#general.showAddition$
  showArrange$ = this.#general.showArrange$


  addToCart(product: GetProductForInvoice) {
    const { productId, productName, serviceId, price, selectedAdditions } = product
    const addProduct: Product = {
      productId,
      productName,
      serviceId,
      price,
      arrangeId: this.selectedArrange?.arrangeId ?? null,
      arrange: this.selectedArrange ??{arrangeId: null, arrangeName: '', price: 0},
      additions: selectedAdditions ?? [],
      additionAmount: selectedAdditions?.reduce((acc, cur) => acc + cur.price, 0) ?? 0,
      arrangeAmount: this.selectedArrange?.price ?? 0
    }
    this.#cartAction.addToCart(addProduct)
  }

}
