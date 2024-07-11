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

  filter(filter: ProductFilter) {
    this.isFullyLoadSubject.next(false);
    const filteredProducts = this.productsSubject.value.filter((product) =>
      this.checkFilter(filter, product)
    );
    this.filteredProductsSubject.next(filteredProducts);
    this.isFullyLoadSubject.next(true);
  }

  checkFilter(filter: ProductFilter, product: Product): boolean {
    if (filter.category.length === 0) {
      return true;
    }
    return filter.category.includes(product.category);
  }

  private loadUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.isFullyLoadSubject.next(false)),
      concatMap(() => obs$),
      finalize(() => this.isFullyLoadSubject.next(true))
    );
  }
}
