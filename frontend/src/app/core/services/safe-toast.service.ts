import { Inject, Injectable } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { PlatformStateService } from './platform-state.service';

@Injectable({
  providedIn: 'root',
})
export class SafeToastService {
  private readonly toast: ToastService | null = null;

  constructor(platformState: PlatformStateService) {
    if (platformState.isBrowser) {
      this.toast = Inject(ToastService);
    }
  }

  public success(successMessage: string): void {
    if (this.toast) {
      this.toast.success(successMessage);
    }
  }

  public error(errorMessage: string): void {
    if (this.toast) {
      this.toast.error(errorMessage);
    }
  }
}
