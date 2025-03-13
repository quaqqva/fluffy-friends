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
    const stateKey = makeStateKey<T | null>(key);
    const state = this.transferState.get<T | null>(stateKey, defaultValue);
    this.transferState.remove(stateKey);
    return state;
  }

  public hasState<T>(key: string) {
    return this.transferState.hasKey<T>(makeStateKey(key));
  }
}
