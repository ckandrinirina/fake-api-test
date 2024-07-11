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

@Injectable({
  providedIn: 'root',
})
export class ProductsStore {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private isFullyLoadSubject = new BehaviorSubject<boolean>(false);
  isFullyLoad$ = this.isFullyLoadSubject.asObservable();

  constructor(private productsService: ProductsService) {
    this.init();
  }

  init() {
    const products$ = this.productsService.getProducts().pipe(
      tap((products) => this.productsSubject.next(products)),
      shareReplay()
    );

    this.loadUntilCompleted(products$).subscribe();
  }

  private loadUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.isFullyLoadSubject.next(false)),
      concatMap(() => obs$),
      finalize(() => this.isFullyLoadSubject.next(true))
    );
  }
}
