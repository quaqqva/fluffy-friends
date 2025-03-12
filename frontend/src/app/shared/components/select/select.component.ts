import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SelectOptionItem } from '../../models/select-option-item.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, Select, FloatLabel, NgTemplateOutlet],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: SelectOptionItem[];
  @Input() label?: string;
}
