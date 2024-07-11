import { Component } from '@angular/core';
import { ProductsStore } from '../../../../feautures/products/store/products.store';
import { ProductFilter } from '../../../../feautures/products/models/product-filter.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  filter: ProductFilter = {
    category: [],
  };

  constructor(public productsStore: ProductsStore) {}

  handleFilterChange(categories: string[]) {
    this.filter.category = categories;
    this.productsStore.filter(this.filter);
  }
}
