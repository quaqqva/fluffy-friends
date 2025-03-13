import { FileResponse } from '../../../../core/models/api/file/file-response.interface';

export interface FileState {
  file: File;
  response?: FileResponse;
  isUploading: boolean;
}
