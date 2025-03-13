import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FileResponse } from '../../models/api/file/file-response.interface';
import { getMockup } from '../../../shared/utils/get-mockup';

@Injectable({
  providedIn: 'root',
})
export class FileApiService {
  private readonly apiUrl = 'file';

  public constructor(private api: ApiService) {}

  public create(module: string, file: File): Observable<FileResponse> {
    const path = this.apiUrl;

    const formData = new FormData();
    formData.append('module', module);
    formData.append('file', file);

    const mockupData = getMockup(
      path,
      { id: 2, name: 'Файл.png', path: 'google.com' },
      formData,
    );

    const requestData = {
      path,
      mockupData,
      body: formData,
    };

    return this.api.post<FileResponse>(requestData);
  }
}
