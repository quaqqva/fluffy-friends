import { Injectable, makeStateKey, TransferState } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  public constructor(private transferState: TransferState) {}

  public saveState<T>(key: string, data: T): void {
    this.transferState.set<T>(makeStateKey(key), data);
  }

  public getState<T>(key: string, defaultValue: T | null = null): T | null {
    const state = this.transferState.get<T | null>(
      makeStateKey(key),
      defaultValue,
    );
    this.transferState.remove(makeStateKey(key));
    return state;
  }

  public hasState<T>(key: string) {
    return this.transferState.hasKey<T>(makeStateKey(key));
  }
}
