import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public constructor(private message: MessageService) {}

  public success(successMessage: string): void {
    this.message.add({
      severity: 'success',
      summary: 'Успех',
      detail: successMessage,
      life: 150000,
    });
  }

  public error(errorMessage: string): void {
    this.message.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: errorMessage,
      life: 150000,
    });
  }
}
