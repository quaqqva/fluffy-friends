import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenubarItem } from './models/menubar-item.interface';
import { Menubar } from 'primeng/menubar';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [Menubar, RouterLink, FaIconComponent, NgClass, Ripple],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent {
  @Input({ required: true }) items!: MenubarItem[];
  protected readonly faAngleDown = faAngleDown;
  protected readonly faAngleRight = faAngleRight;
}
