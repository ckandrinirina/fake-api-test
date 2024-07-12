import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpService } from '../../../shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  getProducts() {
    return this.http.get<Product[]>('products');
  }

  addProducts(product: Product) {
    return this.http.post<Product, Product>('products', product);
  }

  deleteProduct(product: Product) {
    return this.http.delete(`products/${product.id}`);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product, Product>(`products/${id}`, product);
  }
}
