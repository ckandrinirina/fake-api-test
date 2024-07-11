import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  set isAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  get isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }

  // we store here all the data user we need to keep in the store
}
