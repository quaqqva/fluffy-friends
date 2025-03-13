import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ArticleListItem } from '../../core/models/api/articles/article-list-item.interface';
import { ArticleCardComponent } from '../articles/components/article-card/article-card.component';
import { Carousel } from 'primeng/carousel';
import { ButtonComponent } from '../../shared/components/button/button.component';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { PreloaderComponent } from '../../shared/components/preloader/preloader.component';
import { PlatformStateService } from '../../core/services/platform-state.service';
import { TransferStateService } from '../../core/services/transfer-state.service';
import { ArticlesApiService } from '../../core/services/api/articles-api.service';
import { SafeToastService } from '../../core/services/safe-toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ArticleCardComponent,
    Carousel,
    ButtonComponent,
    PreloaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly lastArticles: WritableSignal<ArticleListItem[]> = signal([]);
  public readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;

  private readonly stateKey = 'home-articles';

  public constructor(
    platformState: PlatformStateService,
    private transferState: TransferStateService,
    private articlesApi: ArticlesApiService,
    private toast: SafeToastService,
  ) {
    const isBrowser = platformState.isBrowser;

    if (isBrowser && transferState.hasState(this.stateKey)) {
      this.lastArticles.set(
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
        this.lastArticles.set(articles);

        if (isBrowser) {
          this.isLoading.set(false);
        } else {
          this.transferState.saveState(this.stateKey, articles);
        }
      },
      error: () => {
        if (isBrowser) {
          this.toast!.error('Ошибка загрузки последних статей');
        }
      },
    });
  }
}
