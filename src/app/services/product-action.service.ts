import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetProductForInvoice } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductActionService {

  constructor(private _http: HttpClient) { }

  #productForInvoice = new BehaviorSubject<GetProductForInvoice>({ productId: '', productName: '', price: 0, serviceId: '', changePrice: false, updateQuantity: false, additions: [], arranges: [] })
  productForInvoice$ = this.#productForInvoice.asObservable()
  setProductForInvoice(product: GetProductForInvoice) {
    this.#productForInvoice.next(product)
  }

}
