export interface AddOrderDto {
  clientId: string;
  oldOrderNumber: string;
  express: number;
  total: number;
  discount: number;
  netTotal: number;
  deliverDate: string;
  paymentMethod: PaymentMethod;
  isUrgent: boolean;
  paid: number;
  tax?: number;
  details: AddOrderDetails[];
  beneficiaries?: AddOrderBeneficiaries[];
  delivery: AddOrderDeliveryDto;
}

export enum PaymentMethod {
  Cash,
  Visa,
  Balance,
  Discount,
  Remain,
  Cancel,
  Delete,
  BalanceCash,
  BalanceVisa
}

export interface AddOrderDetails {
  productId: string | null;
  serviceId: string | null;
  arrangeId: string | null;
  other?: string;
  arrangeAmount: number;
  additionAmount: number;
  price: number;
  quantity: number;
  total: number;
  additions: AddOrderAdditionDto[];
}

export interface AddOrderAdditionDto {
  additionId: string;
}

export interface AddOrderBeneficiaries {
  beneficiaryId: string;
}

export interface AddOrderDeliveryDto {
  areaId: string;
  address: string;
  deliveryAmount: number;
}



export interface AddOrderResponse{
  orderId: string,
  data: OrderReceiptDto,
  message: string
}

export interface OrderReceiptDto {
  orderNumber: number;
  phone: string;
  mobile: string;
  clientPhone: string;
  itemsCount: number;
  paymentMethod: PaymentMethod;
  deliveryCharge: number;
  discount: number;
  total: number;
  createdBy: string;
  createdAt: string;
  deliverAt: string;
  remain: number;
  tax: number;
  paid: number;
  items: OrderItemsReceiptDto[];
}

export interface OrderItemsReceiptDto {
  name: string;
  nameAr: string;
  quantity: number;
  price: number;
  total: number;
}
