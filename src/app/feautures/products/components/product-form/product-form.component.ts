import { Component } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryStore } from '../../../categories/store/category.store';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ProductsService } from '../../services/products.service';
import { ProductsStore } from '../../store/products.store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CoreModule, CommonModule, LoaderComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;
  isSubmiting = false;

  constructor(
    private fb: FormBuilder,
    public categoryStore: CategoryStore,
    private productService: ProductsService,
    private productStore: ProductsStore,
    private matDialogRef: MatDialogRef<ProductFormComponent>
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      image: ['https://i.pravatar.cc', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmiting = true;
    this.productService.addProducts(this.productForm.value).subscribe((product) => {
      this.productStore.addProduct(product);
      this.matDialogRef.close();
      this.isSubmiting = false;
    });
  }
}
