import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../feautures/products/services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../feautures/products/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsStore } from '../../../../../feautures/products/store/products.store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productStore: ProductsStore
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.product$ = this.productStore.getProductById(parseInt(id));
  }

  back() {
    window.history.back();
  }
}
