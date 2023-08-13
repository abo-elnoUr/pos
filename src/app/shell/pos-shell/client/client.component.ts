import { Component, inject } from '@angular/core';
import { ClientActionService } from 'src/app/services/client-action.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  #generalService = inject(GeneralService)
  #ClientActionService = inject(ClientActionService)

  client$ = this.#ClientActionService.clientForInvoice$

  setClientPhone(phone: string) {
    if(phone.length < 11) return;
    this.#generalService.getClientForInvoice(phone).subscribe({
      next: (res) => {
        this.#ClientActionService.setClientForInvoice(res)
        this.#ClientActionService.setClientId(res.clientId)
        this.#ClientActionService.setOrderBeneficiaries(res.beneficiaries)
      }
    })
  }

}
