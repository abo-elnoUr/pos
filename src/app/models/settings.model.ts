import { KeyValue } from "@angular/common";
import { InvoiceStatusEnum, ItemStatusEnum, orderStatusEnum, paymentStatusEnum } from "../enums/order.enum";

export interface GetSettings extends ApplicationSettingDto {
  orderStatus: OrderStatusWithCount<orderStatusEnum>[];
  invoiceStatus: OrderStatus<InvoiceStatusEnum>[];
  paymentStatus: OrderStatus<paymentStatusEnum>[];
  itemStatus: OrderStatus<ItemStatusEnum>[];
}
export interface ApplicationSettingDto {
  normal_Order: number;
  normal_Order_Price: number;
  urgent_Order: number;
  urgent_Order_Price: number;
  express_1: number;
  express_1_price: number;
  express_2: number;
  express_2_Price: number;
  express_3: number;
  express_3_Price: number;
  additionalValue: number;
  image: string;
  setting_Name: string;
  setting_Name_Ar: string;
  country_Code: string;
  phone_Length: number;
  terms_And_Conditions: SettingLocalized;
  timeZone: KeyValue<string, string>;
  currency: SettingLocalized;
  maximum_Client_Commission?: number;
  collection_Limit: number;
  whatsApp_Message_Status: SettingLocalized[];
}

export interface SettingLocalized {
  nameAr: string;
  nameEn: string;
}

export interface OrderStatus<T> {
  key: T;
  valueEn: string;
  valueAr: string;
  title: string;
  isActive: boolean;
  isDeafult: boolean;
  order: number;
}
export interface OrderStatusWithCount<T> extends OrderStatus<T> {
  key: T;
  valueEn: string;
  valueAr: string;
  title: string;
  isActive: boolean;
  isDeafult: boolean;
  order: number;
  count: number;
  color: string;
}
export interface OrderStatusName {
  valueEn: string;
  valueAr: string;
}

export interface AddAreaDto {
  id: string;
  areaName: string;
  shippingCharges: number;
}
