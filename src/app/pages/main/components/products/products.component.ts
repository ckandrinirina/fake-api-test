import { Component, OnInit } from '@angular/core';
import { ProductsStore } from '../../../../feautures/products/store/products.store';
import { ProductFilter } from '../../../../feautures/products/models/product-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../../../../feautures/products/components/product-form/product-form.component';
import { Product } from '../../../../feautures/products/models/product.model';
import { ProductsService } from '../../../../feautures/products/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  filter: ProductFilter = {
    category: [],
  };

  isLoading = false;

  constructor(
    public productsStore: ProductsStore,
    private dialog: MatDialog,
    private productService: ProductsService
  ) {}

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

  edit(product: Product) {
    const dialog$ = this.dialog.open(ProductFormComponent, {
      disableClose: true,
      width: '600px',
      data: product,
    });

    dialog$.afterClosed().subscribe(() => {
      this.productsStore.resetFilter();
    });
  }

  delete(product: Product) {
    this.isLoading = true;
    this.productService.deleteProduct(product).subscribe(() => {
      this.productsStore.deleteProduct(product);
      this.isLoading = false;
    });
  }
}
