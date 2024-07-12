import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpService } from '../../../shared/services/http.service';
import { ProductsByCategoryConfig } from '../models/productStats';

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

  getProductById(id: number) {
    return this.http.get<Product>(`products/${id}`);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put<Product, Product>(`products/${id}`, product);
  }

  buildProductByCategoryConfig(
    products: Product[],
    categories: string[]
  ): ProductsByCategoryConfig {
    return {
      series: [
        {
          name: 'Produit/Categorie',
          data: categories.map((category) => {
            return products.filter((product) => product.category === category)
              .length;
          }),
        },
      ],
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Nombre de produits par categorie',
      },
      xaxis: {
        categories,
      },
    };
  }
}
