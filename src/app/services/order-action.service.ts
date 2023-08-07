import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderActionService {

  constructor() { }

  #orderId = new BehaviorSubject<string>('')
  orderId$ = this.#orderId.asObservable()
  setOrderId(orderId: string) {
    this.#orderId.next(orderId)
  }

}
