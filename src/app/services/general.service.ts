import { HttpClient } from '@angular/common/http';
import { Injectable, inject, } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ClientSearchResponse } from '../models/client.model';
import { GetCategoryDropDown } from '../models/category.model';
import { BehaviorSubject, ReplaySubject, map, of, shareReplay, switchMap } from 'rxjs';
import { GetSubCategoryIndexDto } from '../models/subCategory.model';
import { PaginationResponse } from '../models/pagination.model';
import { GetProductByCategory, GetProductForInvoice } from '../models/product.model';
import { AddAreaDto, GetSettings } from '../models/settings.model';
import { AddOrderDto, AddOrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  api = `${environment.ApiUrl}`;

  _http = inject(HttpClient);

  getClientForInvoice(phone: string) {
    return this._http.get<ClientSearchResponse>(`${this.api}/Clients/SearchForInvoice/${phone}`);
  }

  // category

  categories$ = this._http.get<GetCategoryDropDown[]>(`${this.api}/Categories/GetAllDropDown`).pipe(map(data => data), shareReplay(1));

  private selectedCategorySubject = new BehaviorSubject<string>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  categorySelected$ = this.selectedCategory$.pipe(
    switchMap(categoryId =>
      categoryId?.length ?
        this._http.post<PaginationResponse<GetSubCategoryIndexDto>>(`${this.api}/Categories/SubCategory/GetAll`, { pageNumber: 1, pageSize: 100, name: '', mainCategoryId: categoryId })
          .pipe(
            map(data => data.data),
          )
        : this._http.post<PaginationResponse<GetSubCategoryIndexDto>>(`${this.api}/Categories/SubCategory/GetAll`, { pageNumber: 1, pageSize: 100, name: '', mainCategoryId: null })
          .pipe(
            map(data => data.data)
          )
    ),
    shareReplay(1)
  )

  categorySelected(categoryId: string) {
    this.selectedCategorySubject.next(categoryId);
  }



  // product

  getProductForInvoice(filter: GetProductByCategory) {
    return this._http.post<PaginationResponse<GetProductForInvoice>>(`${this.api}/Products/GetProductForInvoice`, filter);
  }

  #subCategoryId = new ReplaySubject<string>();
  selectedSubCategoryId$ = this.#subCategoryId.asObservable();
  #selectedSubCategory = new ReplaySubject<GetSubCategoryIndexDto>();
  selectedSubCategory$ = this.#selectedSubCategory.asObservable();
  subCategorySelected(category: GetSubCategoryIndexDto) {
    this.#selectedSubCategory.next(category);
    this.#subCategoryId.next(category.id)
  }

  subCategorySelected$ = this.selectedSubCategory$.pipe(
    switchMap(({id}) =>
      id ?
        this._http.post<PaginationResponse<GetProductForInvoice>>(`${this.api}/GetProductForInvoice`, {pageNumber: 1, pageSize: 100, categoryId: id})
          .pipe(
            map(data => data.data),
          )
        : of(null)
      ),
      shareReplay(1)
  )

  isOther$ = this.selectedSubCategory$.pipe(
    map(({isOther}) => isOther),
  )
  showAddition$ = this.selectedSubCategory$.pipe(
    map(({showAddition}) => showAddition),
  )
  showArrange$ = this.selectedSubCategory$.pipe(
    map(({showArrange}) => showArrange),
  )


  getAllSettings$ = this._http.get<GetSettings>(`${this.api}/Settings/GetMainSettings`).pipe(shareReplay(1));

  tax$ = this.getAllSettings$.pipe(
    map(data => data.additionalValue),
  )

  listOfAreas$ = this._http.post<PaginationResponse<AddAreaDto>>(`${this.api}/Areas/GetAll`, {
    pageNumber: 1,
    pageSize: 100,
  }).pipe(
    map(d => d.data)
  )

  createOrder(order: AddOrderDto) {
    return this._http.post<AddOrderResponse>(`${this.api}/Orders/Create`, order);
  }

}
