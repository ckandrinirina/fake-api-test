import { Component, Inject, OnInit } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryStore } from '../../../categories/store/category.store';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ProductsService } from '../../services/products.service';
import { ProductsStore } from '../../store/products.store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CoreModule, CommonModule, LoaderComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isSubmiting = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    public categoryStore: CategoryStore,
    private productService: ProductsService,
    private productStore: ProductsStore,
    private matDialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      image: ['https://i.pravatar.cc', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.productForm.patchValue(this.data);
      this.isEditing = true;
    }
  }

  onSubmit() {
    this.isSubmiting = true;
    this.isEditing ? this.doUpdate() : this.doCreate();
  }

  private doUpdate() {
    this.productService
      .updateProduct(this.data.id, this.productForm.value)
      .subscribe((product) => {
        this.productStore.updateProduct(product);
        this.matDialogRef.close();
        this.isSubmiting = false;
      });
  }

  private doCreate() {
    this.productService
      .addProducts(this.productForm.value)
      .subscribe((product) => {
        this.productStore.addProduct(product);
        this.matDialogRef.close();
        this.isSubmiting = false;
      });
  }
}
