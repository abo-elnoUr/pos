import { Pagination } from "./pagination.model";

export interface GetProductByCategory extends Pagination {
  categoryId: string;
}

export interface GetProductForInvoice {
  productId: string;
  serviceId: string;
  productName: string;
  price: number;
  arranges: GetProductArrange[];
  selectedAdditions: GetProductAddition[];
  additions: GetProductAddition[];
  changePrice?: boolean;
  updateQuantity?: boolean;
}

export interface GetProductArrange extends AddProductArrange {
  price: number;
  arrangeName: string;
}

export interface AddProductArrange {
  arrangeId: string;
}

export interface GetProductAddition extends AddProductAddition {
  price: number;
  additionName: string;
}

export interface AddProductAddition {
  additionId: string;
}

export enum expressEnum { NORMAL, URGENT, EXPRESS1, EXPRESS2, EXPRESS3 }


export interface Express {
  expressValue: expressEnum;
  expressDate: number;
  price: number | 0;
}


export interface Product {
  productId: string
  productName: string
  serviceId: string
  price: number
  arrangeId: string
  arrange: GetProductArrange
  additions: GetProductAddition[]
  additionAmount: number
  arrangeAmount: number
}

export type ActionType = 'add' | 'update' | 'delete' | 'clear'

export interface CartItem {
  product: Product
  quntity: number
}

export interface Items {
  item: CartItem
  action: ActionType
}
