import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface MenubarItem {
  label: string;
  routerLink?: (string | number)[];
  icon?: IconDefinition;
  items?: MenubarItem[];
}
