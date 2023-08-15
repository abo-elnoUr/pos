import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay, of, Observable } from 'rxjs';
import { Express, expressEnum } from '../models/product.model';
import { GeneralService } from './general.service';



@Injectable({
  providedIn: 'root'
})
export class PriceActionService {

  #general = inject(GeneralService)

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

  // get express price and date

  expressDateUrgent$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.urgent_Order )
  )
  expressPriceUrgent$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.urgent_Order_Price )
  )
  expressUrgent$: Observable<Express> = combineLatest({
    expressDate: this.expressDateUrgent$,
    price: this.expressPriceUrgent$,
    expressValue: of(expressEnum.URGENT)
  })

  expressDateNormal$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.normal_Order )
  )
  expressPriceNormal$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.normal_Order_Price )
  )
  expressNormal$: Observable<Express> = combineLatest({
    expressDate: this.expressDateNormal$,
    price: this.expressPriceNormal$,
    expressValue: of(expressEnum.NORMAL)
  })

  expressDateExpress1$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.express_1 )
  )
  expressPriceExpress1$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.express_1_price )
  )
  expressExpress1$: Observable<Express> = combineLatest({
    expressDate: this.expressDateExpress1$,
    price: this.expressPriceExpress1$,
    expressValue: of(expressEnum.EXPRESS1)
  })

  expressDateExpress2$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.express_2 )
  )
  expressPriceExpress2$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.express_2_Price )
  )
  expressExpress2$: Observable<Express> = combineLatest({
    expressDate: this.expressDateExpress2$,
    price: this.expressPriceExpress2$,
    expressValue: of(expressEnum.EXPRESS2)
  })

  expressDateExpress3$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.express_3 )
  )
  expressPriceExpress3$ = this.#general.getAllSettings$.pipe(
    map( setting => setting.express_3_Price )
  )
  expressExpress3$: Observable<Express> = combineLatest({
    expressDate: this.expressDateExpress3$,
    price: this.expressPriceExpress3$,
    expressValue: of(expressEnum.EXPRESS3)
  })

  #deliveryDate = new BehaviorSubject<number>(0)
  deliveryDate$ = this.#deliveryDate.asObservable()
  setDeliveryDate(deliveryDate: number) {
    this.#deliveryDate.next(deliveryDate)
  }




}
