import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart } from 'ng-apexcharts';
import { CategoryStore } from '../../../../feautures/categories/store/category.store';
import { ProductsStore } from '../../../../feautures/products/store/products.store';
import { combineLatest, map, Observable } from 'rxjs';
import { ProductsByCategoryConfig } from '../../../../feautures/products/models/productStats';
import { ProductsService } from '../../../../feautures/products/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  productsByCategoryConfig$!: Observable<ProductsByCategoryConfig | null>;

  constructor(
    public categoryStore: CategoryStore,
    public productStore: ProductsStore,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsByCategoryConfig$ = combineLatest([
      this.categoryStore.isFullyLoad$,
      this.productStore.isFullyLoad$,
      this.productStore.products$,
      this.categoryStore.category$,
    ]).pipe(
      map(([isLoadCategories, isLoadProducts, products, categories]) => {
        if (isLoadCategories && isLoadProducts) {
          return this.productsService.buildProductByCategoryConfig(products, categories);
        }
        return null;
      })
    );
  }
}
