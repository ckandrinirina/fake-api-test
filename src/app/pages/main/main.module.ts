import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsListComponent } from '../../feautures/products/components/products-list/products-list.component';
import { CoreModule } from '../../core/core.module';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CategoryFilterComponent } from "../../feautures/categories/components/category-filter/category-filter.component";
@NgModule({
  declarations: [DashboardComponent, ProductsComponent],
  imports: [CommonModule, MainRoutingModule, ProductsListComponent, CoreModule, LoaderComponent, CategoryFilterComponent],
})
export class MainModule {}
