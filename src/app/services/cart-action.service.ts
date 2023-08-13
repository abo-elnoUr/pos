import { Injectable } from '@angular/core';
import { ClientActionService } from './client-action.service';
import { DeliveryActionService } from './delivery-action.service';
import { OrderActionService } from './order-action.service';
import { PriceActionService } from './price-action.service';
import { BehaviorSubject, combineLatest, map, reduce, shareReplay, take } from 'rxjs';
import { GeneralService } from './general.service';
import { CartItem, Items, Product } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class CartActionService {

  constructor(
    private _clientAction: ClientActionService,
    private _deliveryAction: DeliveryActionService,
    private _orderAction: OrderActionService,
    private _priceAction: PriceActionService,
    private _generalService: GeneralService
  ) { }

  #items = new BehaviorSubject<Items>(null)
  items$ = this.#items.asObservable()

  addToCart(product: Product) {
    this.#items.next({
      item: { product, quntity: 1 },
      action: 'add'
    })
  }

  updateCart(product: Product, quntity: number) {
    this.#items.next({
      item: { product, quntity: quntity },
      action: 'update'
    })
  }

  deleteFromCart(product: Product) {
    this.#items.next({
      item: { product, quntity: 0 },
      action: 'delete'
    })
  }

  clearCart() {
    this.#items.next({
      item: { product: {} as Product , quntity: 0 },
      action: 'clear'
    })
  }

  cartItems$ = this.items$.pipe(
    reduce((acc, cur) => this.cartOpreation(acc, cur), [] as CartItem[]),
    shareReplay(1)
  )

  cartOpreation(items: CartItem[], opreations: Items) {

    const { item, action } = opreations
    let found = false
    switch (action) {
      case 'add':
        items.forEach(i => {
          if (i.product.productId == item.product.productId &&
            i.product.additions.length == item.product.additions.length &&
            i.product.serviceId == item.product.serviceId &&
            i.product.additions.every((v, _) => item.product.additions.includes(v))
          ) {
            item.quntity++
            found = true
          }
        })
        return found ? [...items] : [item, ...items];
      case 'update':
        return items.map(i =>
           (
            i.product.productId == item.product.productId &&
            i.product.additions.length == item.product.additions.length &&
            i.product.serviceId == item.product.serviceId &&
            i.product.additions.every((v, _) => item.product.additions.includes(v))
          ) ? i : item
        )
      case 'delete':
        return items.filter(i =>
          !(
            i.product.productId == item.product.productId &&
            i.product.additions.length == item.product.additions.length &&
            i.product.serviceId == item.product.serviceId &&
            i.product.additions.every((v, _) => item.product.additions.includes(v))
          )
        )
      case 'clear':
        return []
    }
  }

  totalItem$ = this.cartItems$.pipe(
    map(items => items.reduce((acc, cur) =>
      acc + (cur.quntity * cur.product.price + cur.product.additionAmount + cur.product.arrangeAmount), 0
    ))
  )

  express$ = combineLatest([
    this.totalItem$,
    this._priceAction.express$
  ]).pipe(
    map(([total, express]) => (total * express.price) - total),
    shareReplay(1)
  )

  discount$ = combineLatest([
    this.express$,
    this._priceAction.discount$,
    this._priceAction.discountFixed$
  ]).pipe(
    map(([tp, d, df]) => Number(((tp * d) / 100 + df).toFixed(2))),
    shareReplay(1)
  )

  total$ = combineLatest([
    this.express$,
    this._deliveryAction.delivery$,
    this.discount$
  ]).pipe(
    map(([express, delivery, discount]) => (express + delivery.deliveryAmount) - discount),
    shareReplay(1)
  )

  tax$ = combineLatest([
    this.total$,
    this._generalService.tax$
  ]).pipe(
    map(([total, tax]) => total / tax),
    shareReplay(1)
  )

  netTotal$ = combineLatest([
    this.total$,
    this.tax$
  ]).pipe(
    map(([total, tax]) => total + tax),
    shareReplay(1)
  )

  remaingMoney$ = combineLatest([
    this.netTotal$,
    this._priceAction.paid$
  ]).pipe(
    map(([netTotal, paid]) => netTotal - paid),
    shareReplay(1)
  )


  cart$ = combineLatest({
    clientId: this._clientAction.clientId$,
    orderNumber: this._orderAction.orderId$,
    details: this.cartItems$,
    paid: this._priceAction.paid$,
    isUrgent: this._priceAction.isUrgent$,
    delivery: this._deliveryAction.delivery$,
    deliverDate: this._deliveryAction.deliverDate$,
    beneficiaries: this._clientAction.clientBeneficiaries$,
    total: this.totalItem$,
    express: this.express$,
    tax: this.tax$,
    discount: this.discount$,
    netTotal: this.netTotal$,
  }).pipe(take(1))


}
