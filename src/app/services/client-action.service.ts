import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { ClientSearchResponse, GetClientBeneficiariesDto } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientActionService {

  constructor() { }

  #clientForInvoice = new BehaviorSubject<ClientSearchResponse | null>(undefined)
  clientForInvoice$ = this.#clientForInvoice.asObservable()
  setClientForInvoice(client: ClientSearchResponse) {
    this.#clientForInvoice.next(client)
  }

  #clinetId = new BehaviorSubject<string>(null)
  clientId$ = this.#clinetId.asObservable()
  setClientId(clientId: string) {
    this.#clinetId.next(clientId)
  }

  #clientBeneficiaries = new BehaviorSubject<GetClientBeneficiariesDto[]>([])
  clientBeneficiaries$ = this.#clientBeneficiaries.asObservable()
  setOrderBeneficiaries(beneficiaries: GetClientBeneficiariesDto[]) {
    this.#clientBeneficiaries.next(beneficiaries)
  }

}
