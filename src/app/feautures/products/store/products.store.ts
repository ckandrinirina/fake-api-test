import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  finalize,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ProductFilter } from '../models/product-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsStore {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private isFullyLoadSubject = new BehaviorSubject<boolean>(false);
  isFullyLoad$ = this.isFullyLoadSubject.asObservable();

  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  constructor(private productsService: ProductsService) {
    this.init();
  }

  private init() {
    const products$ = this.productsService.getProducts().pipe(
      tap((products) => {
        this.productsSubject.next(products);
        this.filteredProductsSubject.next(products);
      }),
      shareReplay()
    );

    this.loadUntilCompleted(products$).subscribe();
  }

  addProduct(product: Product) {
    this.isFullyLoadSubject.next(false);
    product.rating = {
      rate: 0,
      count: 0,
    };
    const products = [...this.productsSubject.value];
    products.push(product);
    this.productsSubject.next(products);
    this.filteredProductsSubject.next(products);
    this.isFullyLoadSubject.next(true);
  }

  updateProduct(product: Product) {
    this.isFullyLoadSubject.next(false);
    const products = this.productsSubject.value.map((p) =>
      p.id === product.id ? { ...product, rating: p.rating } : p
    );
    this.productsSubject.next(products);
    this.filteredProductsSubject.next(products);
    this.isFullyLoadSubject.next(true);
  }

  deleteProduct(product: Product) {
    this.isFullyLoadSubject.next(false);
    const products = this.productsSubject.value.filter(
      (p) => p.id !== product.id
    );
    this.productsSubject.next(products);
    this.filteredProductsSubject.next(products);
    this.isFullyLoadSubject.next(true);
  }

  filter(filter: ProductFilter) {
    this.isFullyLoadSubject.next(false);
    const filteredProducts = this.productsSubject.value.filter((product) =>
      this.checkFilter(filter, product)
    );
    this.filteredProductsSubject.next(filteredProducts);
    this.isFullyLoadSubject.next(true);
  }

  resetFilter() {
    this.filteredProductsSubject.next(this.productsSubject.value);
  }

  checkFilter(filter: ProductFilter, product: Product): boolean {
    const searchCheck =
      product.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.search.toLowerCase()) ||
      product.price.toString().includes(filter.search);

    if (filter.category.length === 0) {
      return searchCheck;
    }

    return filter.category.includes(product.category) && searchCheck;
  }

  private loadUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.isFullyLoadSubject.next(false)),
      concatMap(() => obs$),
      finalize(() => this.isFullyLoadSubject.next(true))
    );
  }
}
