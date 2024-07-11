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
}
