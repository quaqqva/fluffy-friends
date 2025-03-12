import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FaIconComponent,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { FloatLabel } from 'primeng/floatlabel';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { InputMasks } from './models/input-masks.type';
import type { MaskitoOptions } from '@maskito/core';
import { maskitoCaretGuard, maskitoNumberOptionsGenerator } from '@maskito/kit';
import { MaskitoDirective } from '@maskito/angular';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FaIconComponent,
    InputGroup,
    InputText,
    InputGroupAddon,
    FloatLabel,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NgClass,
    MaskitoDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() bigFontSize = false;
  @Input() icon?: IconDefinition;
  @Input() mask: InputMasks = 'none';
  protected readonly faXmark = faXmark;

  get maskOptions(): MaskitoOptions | null {
    switch (this.mask) {
      case 'none':
        return null;
      case 'number': {
        const numberOptions = maskitoNumberOptionsGenerator({
          decimalSeparator: ',',
          precision: 8,
          min: 0,
        });
        return {
          ...numberOptions,
          plugins: [
            ...numberOptions.plugins,
            maskitoCaretGuard((value) => [0, value.length]),
          ],
        };
      }
    }
  }
}
