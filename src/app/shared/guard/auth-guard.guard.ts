import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../../pages/auth/store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authStore.isAuthenticated) {
      return true;
    }
    this.router.navigate(['auth', 'login']);
    return false;
  }
}
