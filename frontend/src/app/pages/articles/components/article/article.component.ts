import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { Article } from '../../../../core/models/api/articles/article.interface';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ArticleCommentCreateComponent } from './article-comment-create/article-comment-create.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { PlatformStateService } from '../../../../core/services/platform-state.service';
import { TransferStateService } from '../../../../core/services/transfer-state.service';
import { ArticlesApiService } from '../../../../core/services/api/articles-api.service';
import { ArticleInfoMockup } from '../../../../core/mockups/articles/article-info.mockup';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../../../core/models/routing/app-routes.enum';
import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';
import { ArticleComment } from '../../../../core/models/api/article-comments/article-comment.interface';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ArticleCommentCreateComponent,
    ArticleCommentComponent,
    DatePipe,
    PreloaderComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  public readonly article: WritableSignal<Article> = signal(
    ArticleInfoMockup.empty,
  );

  public readonly isLoading: WritableSignal<boolean> = signal(false);

  public readonly comments: WritableSignal<ArticleComment[]> = signal([]);

  private readonly stateKey = 'article';

  public constructor(
    platformState: PlatformStateService,
    private transferState: TransferStateService,
    private articlesApi: ArticlesApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const isBrowser = platformState.isBrowser;

    if (isBrowser && transferState.hasState(this.stateKey)) {
      this.article.set(transferState.getState<Article>(this.stateKey)!);
      this.comments.set(this.article().comments);
    } else {
      const id = this.route.snapshot.params['id'];
      this.fetchArticle(id, isBrowser);
    }
  }

  public onCommentCreate(comment: ArticleComment): void {
    this.comments.update((comments) => [comment, ...comments]);
  }

  private fetchArticle(id: string, isBrowser: boolean): void {
    if (isBrowser) {
      this.isLoading.set(true);
    }
    this.articlesApi.getInfo(id).subscribe({
      next: (response) => {
        this.article.set(response);
        this.comments.set(this.article().comments);
        if (isBrowser) {
          this.isLoading.set(false);
        } else {
          this.transferState.saveState(this.stateKey, response);
        }
      },
      error: () => {
        if (isBrowser) {
          this.router.navigate([AppRoutes.NotFound]);
        }
      },
    });
  }
}
