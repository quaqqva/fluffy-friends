import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-preloader',
  imports: [ProgressSpinner],
  standalone: true,
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent {}
