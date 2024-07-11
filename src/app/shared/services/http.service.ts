import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get apiUrl() {
    return environment.apiUrl;
  }

  post<REQ, RES>(url: string, data: REQ) {
    return this.http.post<RES>(`${this.apiUrl}/${url}`, data);
  }

  get<RES>(url: string) {
    return this.http.get<RES>(`${this.apiUrl}/${url}`);
  }

  delete(url: string) {
    return this.http.delete(`${this.apiUrl}/${url}`);
  }

  put<REQ, RES>(url: string, data: REQ) {
    return this.http.put<RES>(`${this.apiUrl}/${url}`, data);
  }

  patch<REQ, RES>(url: string, data: REQ) {
    return this.http.patch<RES>(`${this.apiUrl}/${url}`, data);
  }
}
