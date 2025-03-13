import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { FileApiService } from '../../../core/services/api/file-api.service';
import { FileResponse } from '../../../core/models/api/file/file-response.interface';
import { NgClass } from '@angular/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileState } from './models/file-state.interface';
import { FileItemComponent } from './file-item/file-item.component';
import { SafeToastService } from '../../../core/services/safe-toast.service';

@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [FileUpload, NgClass, FileItemComponent],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneComponent {
  @Input({ required: true }) module!: string;
  @Input() label?: string;
  @Input() acceptedFormats = 'image/*';
  @Input() maxFiles = 1;
  @Input() error = false;

  @Output() filesUploaded = new EventEmitter<FileResponse[]>();
  uploadedFiles: WritableSignal<FileState[]> = signal([]);
  protected readonly faTrash = faTrash;

  constructor(
    private fileApi: FileApiService,
    private toast: SafeToastService,
  ) {}

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      Array.from(event.dataTransfer.files).forEach((file) =>
        this.addFile(file),
      );
    }
  }

  public onFileSelect(event: FileSelectEvent): void {
    Array.from(event.files).forEach((file) => this.addFile(file));
  }

  public removeFile(fileEntry: { file: File; response?: FileResponse }): void {
    this.uploadedFiles.set(this.uploadedFiles().filter((f) => f !== fileEntry));
  }

  private addFile(file: File): void {
    if (this.uploadedFiles.length + 1 > this.maxFiles) {
      this.toast.error('Максимум ' + this.maxFiles + ' файлов');
      return;
    }

    const fileEntry = { file, isUploading: true };
    this.uploadedFiles.set([...this.uploadedFiles(), fileEntry]);
    this.uploadFile(fileEntry);
  }

  private uploadFile(fileEntry: { file: File; isUploading: boolean }): void {
    this.fileApi.create(this.module, fileEntry.file).subscribe({
      next: (response) => {
        const updatedFiles = this.uploadedFiles().map((f) =>
          f.file === fileEntry.file
            ? { ...f, response, isUploading: false }
            : f,
        );
        this.uploadedFiles.set(updatedFiles);
        this.filesUploaded.emit(
          this.uploadedFiles().map((file) => file.response!),
        );
      },
      error: () => {
        const updatedFiles = this.uploadedFiles().map((f) =>
          f.file === fileEntry.file ? { ...f, isUploading: false } : f,
        );
        this.uploadedFiles.set(updatedFiles);
      },
    });
  }
}
