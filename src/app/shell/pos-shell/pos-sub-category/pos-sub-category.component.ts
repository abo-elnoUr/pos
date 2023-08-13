import { Component, inject } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductActionService } from 'src/app/services/product-action.service';
import { GetSubCategoryIndexDto } from 'src/app/models/subCategory.model';

@Component({
  selector: 'app-pos-sub-category',
  templateUrl: './pos-sub-category.component.html',
  styleUrls: ['./pos-sub-category.component.css']
})
export class PosSubCategoryComponent {

  #general = inject(GeneralService)
  #productActionService = inject(ProductActionService)

  subCategories$ = this.#general.categorySelected$

  productFilter: FormGroup = new FormGroup({
    categoryId: new FormControl('', Validators.required),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(100)
  })

  getProducts(sub: GetSubCategoryIndexDto) {
    this.productFilter.patchValue({ categoryId: sub.id })
    this.#general.subCategorySelected(sub)
    this.#general.getProductForInvoice(this.productFilter.getRawValue()).subscribe({
      next: (res) => {
        this.#productActionService.setProductForInvoice(res.data)
      }
    })
  }

}
