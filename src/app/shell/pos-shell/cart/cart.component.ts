import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem, expressEnum } from 'src/app/models/product.model';
import { AddAreaDto } from 'src/app/models/settings.model';
import { CartActionService } from 'src/app/services/cart-action.service';
import { DeliveryActionService } from 'src/app/services/delivery-action.service';
import { GeneralService } from 'src/app/services/general.service';
import { PriceActionService } from 'src/app/services/price-action.service';
import { Express } from '../../../models/product.model';
import { tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentMethod } from 'src/app/models/order.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  #cartAction = inject(CartActionService)
  #priceAction = inject(PriceActionService)
  #general = inject(GeneralService)
  #deliveryAction = inject(DeliveryActionService)

  total$ = this.#cartAction.express$
  totalItemsPrice$ = this.#cartAction.totalItem$
  items$ = this.#cartAction.cartItems$
  netTotal$ = this.#cartAction.netTotal$
  remaining$ = this.#cartAction.remaingMoney$
  tax$ = this.#cartAction.tax$
  paid$ = this.#priceAction.paid$
  listOfArea$ = this.#general.listOfAreas$
  modalService = inject(NgbModal)
  deliveryCost$ = this.#deliveryAction.deliveryAmount$
  discount$ = this.#cartAction.discount$
  fixedDiscount: number = 0
  percentDiscount: number = 0
  expressEnum = expressEnum
  expressUrgent$ = this.#priceAction.expressUrgent$
  normalExpress$ = this.#priceAction.expressNormal$.pipe(
    tap(express => this.normalExpressValue = express)
  )
  express$ = this.#priceAction.express$
  totalExpress$ = this.#cartAction.totalExpress$
  express1$ = this.#priceAction.expressExpress1$
  express2$ = this.#priceAction.expressExpress2$
  express3$ = this.#priceAction.expressExpress3$
  normalExpressValue: Express
  deliveryDate$ = this.#priceAction.deliveryDate$
  deliveryAmount$ = this.#deliveryAction.deliveryAmount$
  dateDelivery: string
  date: string
  address: string
  area: AddAreaDto
  cost: number = 0
  closeResult = ""
  paymentEnum = PaymentMethod
  paidForm = new FormGroup({
    paid: new FormControl(0),
    paymentMethod: new FormControl(PaymentMethod.Cash)
  })


  increaseQuantity(item: CartItem) {
    this.#cartAction.updateCart(item.product, ++item.quntity)
  }

  decreaseQuantity(item: CartItem) {
    this.#cartAction.updateCart(item.product, --item.quntity)
  }

  addUrgent() {
    this.#priceAction.setUrgentStatus(true)
  }

  chooseArea(area: AddAreaDto) {
    this.area = area
    this.cost = area.shippingCharges
  }

  addAddress(address: string) {
    this.address = address
  }

  addDelivery() {
    this.#deliveryAction.setAddress(this.address)
    this.#deliveryAction.setAreaId(this.area.id)
    this.#deliveryAction.setDeliveryAmount(this.cost)
  }

  deleteItem(item: CartItem) {
    this.#cartAction.deleteFromCart(item.product)
  }

  getPaidAmount(amount: number) {
    if(amount > 0) {
      this.#priceAction.setPaid(amount)
    }
  }

  checkPaymentMethod() {
    let paymentType = this.paidForm.get('paymentMethod').value
    if(paymentType == PaymentMethod.Balance) {
      this.paidForm.get('paid').setValue(0)
      this.paidForm.get('paid').disable()
    } else {
      this.paidForm.get('paid').enable()
    }
  }

  changePercentageDiscount(amount: number) {
    if (+amount > 0) {
      this.#priceAction.setDiscountFixed(0)
      this.fixedDiscount = 0
      this.#priceAction.setDiscount(+amount)
    }
  }

  changeFixedDiscount(amount: number) {
    if (+amount > 0) {
      this.#priceAction.setDiscount(0)
      this.percentDiscount = 0
      this.#priceAction.setDiscountFixed(+amount)
    }
  }

  clearDiscount() {
    this.#priceAction.setDiscount(0)
    this.percentDiscount = 0
    this.#priceAction.setDiscountFixed(0)
    this.fixedDiscount = 0
  }

  changeExpressUrgent(express: Express, urgent?: boolean) {
    if (urgent) {
      this.#priceAction.setUrgentStatus(true)
      this.#priceAction.setExpress(express)
      this.#priceAction.setDeliveryDate(express.expressDate)
    } else {
      this.#priceAction.setUrgentStatus(false)
      this.#priceAction.setExpress(this.normalExpressValue)
      this.#priceAction.setDeliveryDate(express.expressDate)
    }
  }

  changeExpress(express: Express) {
    this.#priceAction.setExpress(express)
    this.#priceAction.setDeliveryDate(express.expressDate)
  }

  clearExpress(express: Express) {
    this.#priceAction.setExpress(express)
  }

  getDelivryDate(date: number) {
    this.date = new Date(Date.now() + date * (60 * 60 * 1000)).toISOString().slice(0, 16)
    this.#priceAction.setDeliveryDate(date)
    this.dateDelivery = this.date
    return this.date
  }

  clearDeliveryData() {
    this.#deliveryAction.setAddress(null)
    this.#deliveryAction.setAreaId(null)
    this.#deliveryAction.setDeliveryAmount(0)
  }

  openDelivery(content: any, delivery?: boolean) {
    if (!delivery) {
      this.clearDeliveryData()
    }
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  submit() {
    console.log(this.paidForm.value)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
