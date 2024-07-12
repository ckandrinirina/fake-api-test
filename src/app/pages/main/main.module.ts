import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsListComponent } from '../../feautures/products/components/products-list/products-list.component';
import { CoreModule } from '../../core/core.module';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { CategoryFilterComponent } from '../../feautures/categories/components/category-filter/category-filter.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductDetailsUiComponent } from '../../feautures/products/components/product-details/product-details.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ProductsListComponent,
    CoreModule,
    LoaderComponent,
    CategoryFilterComponent,
    NgApexchartsModule,
    ProductDetailsUiComponent,
  ],
})
export class MainModule {}
