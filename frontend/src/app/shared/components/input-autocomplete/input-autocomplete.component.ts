import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FaIconComponent,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { NgTemplateOutlet } from '@angular/common';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [
    FaIconComponent,
    FloatLabel,
    FormsModule,
    InputGroup,
    InputGroupAddon,
    NgTemplateOutlet,
    AutoComplete,
    ReactiveFormsModule,
  ],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAutocompleteComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() bigFontSize = false;
  @Input() icon?: IconDefinition;
}
