import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpService) {}

  getCategories() {
    return this.http.get<string[]>('products/categories');
  }
}
