import { Component, OnInit } from '@angular/core';
import { CategoryStore } from '../../../../feautures/categories/store/category.store';
import { ProductsStore } from '../../../../feautures/products/store/products.store';
import { combineLatest, map, Observable } from 'rxjs';
import { BarStatsConfig } from '../../../../feautures/products/models/productStats';
import { ProductsService } from '../../../../feautures/products/services/products.service';
import { Product } from '../../../../feautures/products/models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<{
    productByCategoryConfig: BarStatsConfig;
    rateByCategoryConfig: BarStatsConfig;
  } | null>;
  bestProduct!: Product;

  constructor(
    public categoryStore: CategoryStore,
    public productStore: ProductsStore,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.stats$ = combineLatest([
      this.categoryStore.isFullyLoad$,
      this.productStore.isFullyLoad$,
      this.productStore.products$,
      this.categoryStore.category$,
    ]).pipe(
      map(([isLoadCategories, isLoadProducts, products, categories]) => {
        if (isLoadCategories && isLoadProducts) {
          this.bestProduct = this.productsService.getBestProduct(products);
          return {
            productByCategoryConfig:
              this.productsService.buildProductByCategoryConfig(
                products,
                categories
              ),
            rateByCategoryConfig:
              this.productsService.buildAverageRateByCategoryConfig(
                products,
                categories
              ),
          };
        }
        return null;
      })
    );
  }
}
