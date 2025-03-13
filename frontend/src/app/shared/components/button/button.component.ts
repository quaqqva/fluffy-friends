import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {
  FaIconComponent,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { ButtonThemes } from './models/button-themes.enum';
import { ButtonTypes } from './models/button-types.enum';
import { PreloaderComponent } from '../preloader/preloader.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FaIconComponent, NgClass, PreloaderComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() icon!: IconDefinition;
  @Input() iconOnly = false;
  @Input() isLoading = false;
  @Input() theme: ButtonThemes = ButtonThemes.Primary;
  @Input() type: ButtonTypes = ButtonTypes.Button;
  @HostBinding('class.pointer-events-none') @Input() disabled = false;
}
