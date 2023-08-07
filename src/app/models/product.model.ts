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
