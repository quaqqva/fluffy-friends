import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FileState } from '../models/file-state.interface';
import { ButtonComponent } from '../../button/button.component';
import { PreloaderComponent } from '../../preloader/preloader.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [ButtonComponent, PreloaderComponent],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItemComponent {
  @Input({ required: true }) fileState!: FileState;
  @Output() deleted = new EventEmitter<void>();
  protected readonly faTrash = faTrash;
}
