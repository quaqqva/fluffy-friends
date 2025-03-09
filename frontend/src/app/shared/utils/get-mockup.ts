import { delay, Observable, of, tap } from 'rxjs';

export function getMockup<TRequest, TResponse>(
  methodName: string,
  data: TResponse,
  requestData?: TRequest,
): Observable<TResponse> {
  return of(data).pipe(
    tap((res) => {
      console.log(`Api ${methodName}()`, requestData || '');
      console.log(res);
    }),
    delay(Math.random() * 1000),
  );
}
