import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiRequestData<TRequest = unknown, TResponse = never> {
  path: string;
  body?: TRequest;
  params?: HttpParams;
  forceMockup?: boolean;
  mockupData: Observable<TResponse>;
}
