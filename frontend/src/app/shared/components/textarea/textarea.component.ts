import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { NgTemplateOutlet } from '@angular/common';
import { Textarea } from 'primeng/textarea';
import { FloatLabelVariants } from '../../models/float-label-variants.enum';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabel, NgTemplateOutlet, Textarea],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() floatLabelVariant: FloatLabelVariants = FloatLabelVariants.On;
  @Input() label?: string;
}
