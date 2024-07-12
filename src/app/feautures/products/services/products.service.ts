import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpService } from '../../../shared/services/http.service';
import { BarStatsConfig, PiesStatsConfig } from '../models/productStats';

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

  getBestProduct(products: Product[]): Product {
    return products.reduce((prev, current) =>
      prev.rating.rate > current.rating.rate ? prev : current
    );
  }

  buildProductByCategoryConfig(
    products: Product[],
    categories: string[]
  ): BarStatsConfig {
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
        height: '300px',
      },
      title: {
        text: 'Nombre de produits par categorie',
      },
      xaxis: {
        categories,
      },
    };
  }

  buildAverageRateByCategoryConfig(
    products: Product[],
    categories: string[]
  ): BarStatsConfig {
    return {
      series: [
        {
          name: 'Note/catégorie',
          data: categories.map((category) => {
            const productsByCategory = products.filter(
              (product) => product.category === category
            );
            const rate = productsByCategory.reduce(
              (prev, current) => prev + current.rating.rate,
              0
            );
            return {
              x: category,
              y: parseFloat((rate / productsByCategory.length).toFixed(2)),
              fillColor:
                rate / productsByCategory.length > 4 ? '#4CAF50' : '#F44336',
            };
          }),
        },
      ],
      chart: {
        type: 'bar',
        height: '300px',
      },
      title: {
        text: 'Note moyenne par categorie',
      },
      xaxis: {
        categories,
      },
    };
  }
}
