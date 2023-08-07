import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private isUrgent = new BehaviorSubject<boolean>(false)
  isUrgent$ = this.isUrgent.asObservable()
  changeUrgentStatus(isUrgent: boolean) {
    this.isUrgent.next(isUrgent)
  }

}
