import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

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
}
