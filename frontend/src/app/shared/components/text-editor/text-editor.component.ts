import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { Editor, EditorTextChangeEvent } from 'primeng/editor';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [Editor, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent implements ControlValueAccessor {
  @Input() public label?: string;

  public content = '';

  public constructor(ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  @Input() set value(val: string) {
    this.content = val || '';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (value: string) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: string): void {
    this.content = value || '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onTextChange(event: EditorTextChangeEvent): void {
    this.content = (event.htmlValue || '').replace(/&nbsp;/g, ' ');
    this.onChange(this.content);
  }
}
