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
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AddOrderDto, PaymentMethod } from 'src/app/models/order.model';
import { ClientActionService } from 'src/app/services/client-action.service';


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
  #clientAction = inject(ClientActionService)

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
    tap(express => this.normalExpressValue = express),
    tap(express => this.#priceAction.setExpress(express)),
    tap(express => this.#priceAction.setDeliveryDate(express.expressDate))
  )
  express$ = this.#priceAction.express$
  totalExpress$ = this.#cartAction.totalExpress$
  express1$ = this.#priceAction.expressExpress1$
  express2$ = this.#priceAction.expressExpress2$
  express3$ = this.#priceAction.expressExpress3$
  normalExpressValue: Express
  deliveryDate$ = this.#priceAction.deliveryDate$
  dateDelivery: string
  date: string
  address: string
  area: AddAreaDto
  cost: number = 0
  closeResult = ""
  paymentEnum = PaymentMethod
  paidForm = new FormGroup({
    paid: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(0), this.nonNegativeNumberValidator()]),
    paymentMethod: new FormControl(PaymentMethod.Cash)
  })
  cart$ = this.#cartAction.cart$
  order: AddOrderDto
  noSubmit: boolean = false
  discountPercentage$ = this.#priceAction.discount$

  clientBalance: number = 0
  remainigMoney: number = 0
  collectionLimit: number = 0
  allRemainingMoney: number = 0
  clientId: string

  constructor() {
    this.order = {
      clientId: "",
      oldOrderNumber: "",
      express: 0,
      total: 0,
      discount: 0,
      netTotal: 0,
      deliverDate: "",
      paymentMethod: this.paymentEnum.Cash,
      isUrgent: false,
      paid: 0,
      details: [],
      delivery: { areaId: "", deliveryAmount: 0, address: "" },
      beneficiaries: []
    }
    this.checkPaymentMethod()
  }

  nonNegativeNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value < 0) {
        return { negativeNumber: true };
      }
      return null;
    };
  }



  increaseQuantity(item: CartItem) {
    this.#cartAction.updateCart(item.product, ++item.quntity)
  }

  decreaseQuantity(item: CartItem) {
    this.#cartAction.updateCart(item.product, --item.quntity)
    if (item.quntity == 0) {
      this.#cartAction.deleteFromCart(item.product)
    }

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
    if (+amount >= 0) {
      this.#priceAction.setPaid(+amount)
    }
  }

  changePercentageDiscount(amount: number) {
    if (+amount >= 0) {
      this.#priceAction.setDiscountFixed(0)
      this.fixedDiscount = 0
      this.#priceAction.setDiscount(+amount)
    } else {
      alert("discount must be positive number")
      this.percentDiscount = 0
    }
  }

  changeFixedDiscount(amount: number) {
    if (+amount >= 0) {
      this.#priceAction.setDiscount(0)
      this.percentDiscount = 0
      this.#priceAction.setDiscountFixed(+amount)
    } else {
      alert("discount must be positive number")
      this.fixedDiscount = 0
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
    this.#priceAction.setDeliveryDate(express.expressDate)
  }

  setDelivryDate(date: number) {
    this.date = new Date(Date.now() + date * (60 * 60 * 1000)).toISOString().slice(0, 16)
    this.#deliveryAction.changeDeliverDate(this.date)
    this.dateDelivery = this.date
    return this.date
  }

  changeDeliveryDate(d: string) {
    let dd = new Date(d)
    let diff = (dd.getTime() - new Date().getTime()) / 1000
    diff /= 60 * 60
    diff = Math.abs(Math.round(diff))
    this.#priceAction.setDeliveryDate(diff)
  }

  clearDeliveryData() {
    this.#deliveryAction.setAddress(null)
    this.#deliveryAction.setAreaId(null)
    this.#deliveryAction.setDeliveryAmount(0)
  }
  paid: number
  checkPaymentMethod() {
    let paymentType = this.paidForm.get('paymentMethod').value
    this.paid$.subscribe({
      next: (res) => {
        this.paid = res
      }
    })
    if(this.paid > this.remainigMoney) {
      alert('you can not paid more than remaaining')
    }
    if (paymentType == PaymentMethod.Balance) {
      this.paidForm.get('paid').setValue(0)
      this.paidForm.get('paid').disable()
    }
    else if (paymentType == PaymentMethod.Cash || paymentType == PaymentMethod.Visa) {
      this.paidForm.get('paid').enable()
      this.#clientAction.clientForInvoice$.subscribe({ next: client => this.clientBalance = client ? client.balance : 0 })
      this.#general.collectionLimit$.subscribe(limit => {
        this.collectionLimit = limit
        this.allRemainingMoney = this.remainigMoney + (this.clientBalance < 0 ? this.clientBalance * -1 : this.clientBalance)
      })
      if (this.allRemainingMoney > this.collectionLimit) {
        this.noSubmit = true
        alert("client balance can not more than collection limit 😑")
      } else {
        this.noSubmit = false
      }
    } else {
      this.paidForm.get('paid').enable()
    }
  }

  checkForSubmit() {
    this.#clientAction.clientId$.subscribe({
      next: (id) => {
        this.clientId = id
      }
    })
    this.remaining$.subscribe({
      next: (remaining) => {
        this.remainigMoney = remaining
      }
    })

    this.checkPaymentMethod()

    if (this.remainigMoney < 0) {
      alert("remaing money can not be negative 😑")
      return
    }
    if (this.clientId === null) {
      alert("please add client 😑")
      return
    }
    this.submit()

  }

  submit() {
    this.#cartAction.click.next(true)
    this.cart$.subscribe({
      next: ({ clientId, discount, details, beneficiaries, deliverDate, delivery, express, isUrgent, netTotal, orderNumber, paid, tax, total }) => {
        this.order.clientId = clientId,
          this.order.discount = discount,
          this.order.oldOrderNumber = orderNumber,
          this.order.tax = tax,
          this.order.total = total,
          this.order.netTotal = netTotal,
          this.order.paid = paid,
          this.order.delivery = delivery,
          this.order.deliverDate = deliverDate,
          this.order.express = express,
          this.order.isUrgent = isUrgent,
          this.order.beneficiaries = beneficiaries,
          this.order.paymentMethod = this.paidForm.get('paymentMethod').value,
          details.forEach(detail => {
            const { productId, serviceId, price, additionAmount, arrangeAmount, arrangeId, additions } = detail?.product;
            this.order.details.push({
              productId, serviceId, quantity: detail.quntity, price, total, arrangeId, arrangeAmount, additionAmount, additions
            })
          }
          )
        this.#cartAction.click.next(false)
      }

    })

    this.#general.createOrder(this.order).subscribe({
      next: (res) => {
        alert(`order created successfully 😊 `)
      }
    })
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
