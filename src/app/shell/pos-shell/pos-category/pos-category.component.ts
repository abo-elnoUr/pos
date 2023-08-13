import { Component, inject } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-pos-category',
  templateUrl: './pos-category.component.html',
  styleUrls: ['./pos-category.component.css']
})
export class PosCategoryComponent {

  #general = inject(GeneralService)

  categories$ = this.#general.categories$

  setCategory(categoryId: string) {
    this.#general.categorySelected(categoryId)
  }

}
