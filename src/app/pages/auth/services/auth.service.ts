import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import SecureLs from 'secure-ls';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ls = new SecureLs();

  constructor(
    private http: HttpService,
    private authStore: AuthStore,
    private router: Router
  ) {}

  login({ username, password }: { username: string; password: string }) {
    return this.http.post<LoginCredentials, { token: string }>('auth/login', {
      username,
      password,
    });
  }

  authenticate(token: string) {
    this.setToken(token);
    this.authStore.isAuthenticated = true;
    this.router.navigate(['']);
  }

  setToken(token: string) {
    this.ls.set('token', token);
  }

  getToken() {
    return this.ls.get('token');
  }
}
