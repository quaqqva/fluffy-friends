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
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { MaskitoOptions } from '@maskito/core';
import { maskitoCaretGuard, maskitoNumberOptionsGenerator } from '@maskito/kit';
import { MaskitoDirective } from '@maskito/angular';
import { InputMasks } from './models/input-masks.enum';
import { FloatLabelVariants } from '../../models/float-label-variants.enum';

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
    FormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public floatLabelVariant: FloatLabelVariants = FloatLabelVariants.On;
  @Input() public placeholder = '';
  @Input() public bigFontSize = false;
  @Input() public icon?: IconDefinition;
  @Input() public mask: InputMasks | null = null;
  @Input() public withClear = false;
  protected readonly faXmark = faXmark;
  protected value: string | number = '';

  public constructor(ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  public get maskOptions(): MaskitoOptions | null {
    switch (this.mask) {
      case null:
        return null;
      case InputMasks.Number: {
        const numberOptions = maskitoNumberOptionsGenerator({
          precision: 0,
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (value: string | number) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: string | number): void {
    this.value = value || '';
  }

  public registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onInput(): void {
    if (this.mask === 'number') {
      this.value = parseInt(this.value.toString().replace(/\s/g, ''));
    }
    this.onChange(this.value);
  }
}
