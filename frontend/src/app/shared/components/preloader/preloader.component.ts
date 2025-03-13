import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-preloader',
  imports: [ProgressSpinner],
  standalone: true,
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent {
  @HostBinding('class.small') @Input() small = false;
  @HostBinding('class.inline') @Input() inline = false;
}
