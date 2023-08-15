import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { AddOrderDeliveryDto } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryActionService {

  constructor() { }

  #areaId = new BehaviorSubject<string>('')
  areaId$ = this.#areaId.asObservable()
  setAreaId(areaId: string) {
    this.#areaId.next(areaId)
  }

  #address = new BehaviorSubject<string>('')
  address$ = this.#address.asObservable()
  setAddress(address: string) {
    this.#address.next(address)
  }

  #deliveryPrice = new BehaviorSubject<number>(0)
  deliveryAmount$ = this.#deliveryPrice.asObservable()
  setDeliveryAmount(deliveryAmount: number) {
    this.#deliveryPrice.next(deliveryAmount)
  }

  delivery$: Observable<AddOrderDeliveryDto | null> = combineLatest({
    areaId: this.areaId$,
    address: this.address$,
    deliveryAmount: this.deliveryAmount$
  })

  private deliverDate = new BehaviorSubject<string>('');
  deliverDate$ = this.deliverDate.asObservable();
  changeDeliverDate(date: string) {
    this.deliverDate.next(date);
  }

}
