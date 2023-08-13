import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Express } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PriceActionService {

  constructor() { }

  #paid = new BehaviorSubject<number>(0)
  paid$ = this.#paid.asObservable()
  setPaid(paid: number) {
    this.#paid.next(paid)
  }

  #isUrgent = new BehaviorSubject<boolean>(false)
  isUrgent$ = this.#isUrgent.asObservable()
  setUrgentStatus(isUrgent: boolean) {
    this.#isUrgent.next(isUrgent)
  }

  #express = new BehaviorSubject<Express>(null)
  express$ = this.#express.asObservable().pipe(
    shareReplay(1)
  )
  setExpress(express: Express){
    this.#express.next(express);
  }

  #discount = new BehaviorSubject<number>(0)
  discount$ = this.#discount.asObservable()
  setDiscount(discountValue: number) {
    this.#discount.next(discountValue)
  }

  #discountFixed = new BehaviorSubject<number>(0)
  discountFixed$ = this.#discountFixed.asObservable()
  setDiscountFixed(discountValue: number) {
    this.#discountFixed.next(discountValue)
  }

}
