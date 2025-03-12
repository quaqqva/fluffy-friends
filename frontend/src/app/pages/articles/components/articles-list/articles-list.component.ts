import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { ArticleListItem } from '../../../../core/models/api/articles/article-list-item.interface';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputNumber } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ArticleListFiltersComponent } from './article-list-filters/article-list-filters.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PlatformStateService } from '../../../../core/services/platform-state.service';
import { TransferStateService } from '../../../../core/services/transfer-state.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ArticlesApiService } from '../../../../core/services/api/articles-api.service';
import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';

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
    PreloaderComponent,
  ],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListComponent {
  public readonly articles: WritableSignal<ArticleListItem[]> = signal([]);

  public readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly faPlus = faPlus;

  private readonly stateKey = 'catalog-articles';

  private toast: ToastService | null = null;

  public constructor(
    platformState: PlatformStateService,
    private transferState: TransferStateService,
    private articlesApi: ArticlesApiService,
  ) {
    const isBrowser = platformState.isBrowser;

    if (isBrowser) {
      this.toast = Inject(ToastService);
    }

    if (isBrowser && transferState.hasState(this.stateKey)) {
      this.articles.set(
        transferState.getState<ArticleListItem[]>(this.stateKey)!,
      );
    } else {
      this.fetchArticles(isBrowser);
    }
  }

  private fetchArticles(isBrowser: boolean): void {
    if (isBrowser) {
      this.isLoading.set(true);
    }

    this.articlesApi.getList({ limit: 6, offset: 0 }).subscribe({
      next: (response) => {
        const articles = response.items!;
        this.articles.set(articles);

        if (isBrowser) {
          this.isLoading.set(false);
        } else {
          this.transferState.saveState(this.stateKey, articles);
        }
      },
      error: () => {
        if (isBrowser) {
          this.toast!.error('Ошибка загрузки статей');
        }
      },
    });
  }
}
