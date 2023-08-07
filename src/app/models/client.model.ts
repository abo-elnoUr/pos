export interface ClientSearchResponse {
  clientId: string;
  name: string;
  ordersCount: number;
  balance: number;
  notes: string;
  phoneNumber: string;
  beneficiaries: GetClientBeneficiariesDto[];
  collectionLimit: number;
}

export interface GetClientBeneficiariesDto {
  id: string;
  number: number;
  name: string;
  notes: string;
}


export interface ClientForInvoice {
  clientId: string;
  balance: number;
  collectionLimit: number;
}


export interface AddOrderBeneficiaries {
  beneficiaryId: string;
}
