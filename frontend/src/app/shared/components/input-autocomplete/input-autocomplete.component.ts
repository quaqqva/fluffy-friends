import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FaIconComponent,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { NgTemplateOutlet } from '@angular/common';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { SelectOptionItem } from '../../models/select-option-item.interface';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';

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
  @Input({ required: true }) options!: SelectOptionItem[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() bigFontSize = false;
  @Input() icon?: IconDefinition;
  @Output() search = new EventEmitter<string>();

  private readonly queryDebouncer = new Subject<string>();

  public constructor() {
    this.queryDebouncer
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => !!value && value.length > 2),
      )
      .subscribe((query) => {
        this.search.emit(query);
      });
  }

  public onSearch(event: AutoCompleteCompleteEvent): void {
    this.queryDebouncer.next(event.query);
  }
}
