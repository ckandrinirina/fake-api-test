import { Component } from '@angular/core';
import { ProductsStore } from '../../../../feautures/products/store/products.store';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productsStore: ProductsStore) {}
}
