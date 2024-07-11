import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [DashboardComponent, ProductsComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
