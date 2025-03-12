import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleListItem } from '../../../../core/models/api/articles/article-list-item.interface';
import { ArticlesListMockup } from '../../../../core/mockups/articles/articles-list.mockup';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputNumber } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ArticleListFiltersComponent } from './article-list-filters/article-list-filters.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [
    ArticleCardComponent,
    FaIconComponent,
    InputNumber,
    DropdownModule,
    FormsModule,
    InputText,
    ButtonDirective,
    InputGroup,
    InputComponent,
    ArticleListFiltersComponent,
    ButtonComponent,
  ],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListComponent {
  public readonly articles: ArticleListItem[] = ArticlesListMockup.list.items;

  sortOptions = [
    { label: 'Новизне', value: 'new' },
    { label: 'Популярности', value: 'popular' },
  ];

  selectedSort = 'new';

  protected readonly faSearch = faSearch;
  protected readonly faPlus = faPlus;
}
