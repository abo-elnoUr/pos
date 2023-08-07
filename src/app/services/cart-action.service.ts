import { Injectable } from '@angular/core';
import { ClientActionService } from './client-action.service';
import { DeliveryActionService } from './delivery-action.service';
import { OrderActionService } from './order-action.service';
import { PriceActionService } from './price-action.service';
import { ProductActionService } from './product-action.service';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartActionService {

  constructor(
    private _clientAction: ClientActionService,
    private _deliveryAction: DeliveryActionService,
    private _orderAction: OrderActionService,
    private _priceAction: PriceActionService,
    private _productAction: ProductActionService
  ) { }

  cart$ = combineLatest({
    clientId: this._clientAction.clientId$,
    orderNumber: this._orderAction.orderId$,
    paid: this._priceAction.paid$,
    isUrgent: this._priceAction.isUrgent$,
    delivery: this._deliveryAction.delivery$,
    deliverDate: this._deliveryAction.deliverDate$,
    beneficiaries: this._clientAction.clientBeneficiaries$
  })


}
