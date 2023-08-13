import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { AddOrderBeneficiaries, ClientForInvoice } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientActionService {

  constructor() { }

  #clientForInvoice = new BehaviorSubject<ClientForInvoice>({clientId: '', collectionLimit: 0, balance: 0})
  clientForInvoice$ = this.#clientForInvoice.asObservable()
  setClientForInvoice(client: ClientForInvoice) {
    this.#clientForInvoice.next(client)
  }

  #clinetId = new BehaviorSubject<string>('')
  clientId$ = this.#clinetId.asObservable()
  setClientId(clientId: string) {
    this.#clinetId.next(clientId)
  }

  #clientBeneficiaries = new BehaviorSubject<AddOrderBeneficiaries[]>([])
  clientBeneficiaries$ = this.#clientBeneficiaries.asObservable()
  setOrderBeneficiaries(beneficiaries: AddOrderBeneficiaries[]) {
    this.#clientBeneficiaries.next(beneficiaries)
  }

}
