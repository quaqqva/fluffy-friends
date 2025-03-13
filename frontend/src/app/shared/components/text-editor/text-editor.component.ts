import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [ReactiveFormsModule, Editor],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label?: string;
}
