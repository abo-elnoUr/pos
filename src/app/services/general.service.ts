import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ClientSearchResponse } from '../models/client.model';
import { GetCategoryDropDown } from '../models/category.model';
import { BehaviorSubject, map, shareReplay, switchMap } from 'rxjs';
import { GetSubCategoryIndexDto } from '../models/subCategory.model';
import { PaginationResponse } from '../models/pagination.model';
import { GetProductByCategory, GetProductForInvoice } from '../models/product.model';
import { GetSettings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  api = `${environment.ApiUrl}`;

  constructor(private _http: HttpClient) { }

  getClientForInvoice(phone: string) {
    return this._http.get<ClientSearchResponse>(`${this.api}/Clients/SearchForInvoice/${phone}`);
  }

  getAllDropDownCategories() {
    return this._http.get<GetCategoryDropDown[]>(`${this.api}/Categories/GetAllDropDown`);
  }

  private selectedCategorySubject = new BehaviorSubject<string>('');
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

  // settings

  #refreshSettings = new BehaviorSubject<void>(undefined)
  refreshSettings() {
    this.#refreshSettings.next()
  }

  getAllSettings$ = this.#refreshSettings.pipe(
    switchMap( _ => this._http.get<GetSettings>(`${this.api}/Settings/GetMainSettings`).pipe(shareReplay(1)))
  )

}
