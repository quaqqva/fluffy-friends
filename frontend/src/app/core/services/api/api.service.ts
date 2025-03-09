import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRequestData } from '../../models/api/api-request-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private shouldMockup = environment.mockup;

  constructor(private http: HttpClient) {}

  post<T>(data: ApiRequestData<unknown, T>): Observable<T> {
    if (this.shouldMockup || data.forceMockup) {
      return data.mockupData || EMPTY;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
      }),
    };

    return this.http.post<T>(this.apiUrl + data.path, data.body, httpOptions);
  }

  get<T>(data: ApiRequestData<unknown, T>): Observable<T> {
    if (this.shouldMockup) {
      return data.mockupData || EMPTY;
    }

    return this.http.get<T>(this.apiUrl + data.path);
  }

  put<T = never>(data: ApiRequestData): Observable<T> {
    if (this.shouldMockup) {
      return data.mockupData || EMPTY;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
      }),
    };

    return this.http.put<T>(this.apiUrl + data.path, data.body, httpOptions);
  }

  delete<T = never>(data: ApiRequestData): Observable<T> {
    if (this.shouldMockup) {
      return data.mockupData || EMPTY;
    }

    return this.http.delete<T>(this.apiUrl + data.path);
  }
}
