export interface PaginationResponse<T> {
  count: number;
  data: T[];
}

export interface Pagination {
  clientId?:string;
  name?:string;
  pageNumber: number;
  pageSize: number;
}
