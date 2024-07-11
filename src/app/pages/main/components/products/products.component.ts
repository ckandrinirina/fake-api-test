import { Component, OnInit } from '@angular/core';
import { ProductsStore } from '../../../../feautures/products/store/products.store';
import { ProductFilter } from '../../../../feautures/products/models/product-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../../../../feautures/products/components/product-form/product-form.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  filter: ProductFilter = {
    category: [],
  };

  constructor(public productsStore: ProductsStore, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.productsStore.resetFilter();
  }

  handleFilterChange(categories: string[]) {
    this.filter.category = categories;
    this.productsStore.filter(this.filter);
  }

  addProduct() {
    const dialog$ = this.dialog.open(ProductFormComponent, {
      disableClose: true,
      width: '600px',
    });

    dialog$.afterClosed().subscribe(() => {
      this.productsStore.resetFilter();
    });
  }
}
