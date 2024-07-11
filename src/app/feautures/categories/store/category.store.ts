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
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryStore {
  private categorySubject = new BehaviorSubject<string[]>([]);
  category$ = this.categorySubject.asObservable();

  private isFullyLoadSubject = new BehaviorSubject<boolean>(false);
  isFullyLoad$ = this.isFullyLoadSubject.asObservable();

  constructor(private categoryService: CategoryService) {
    this.init();
  }

  init() {
    const category$ = this.categoryService.getCategories().pipe(
      tap((category) => this.categorySubject.next(category)),
      shareReplay()
    );

    this.loadUntilCompleted(category$).subscribe();
  }

  private loadUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.isFullyLoadSubject.next(false)),
      concatMap(() => obs$),
      finalize(() => this.isFullyLoadSubject.next(true))
    );
  }
}
