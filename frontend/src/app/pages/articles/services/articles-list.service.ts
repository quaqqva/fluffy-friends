import { Injectable, signal, WritableSignal } from '@angular/core';
import { ArticlesApiService } from '../../../core/services/api/articles-api.service';
import { ArticleListItem } from '../../../core/models/api/articles/article-list-item.interface';
import { Observable, tap } from 'rxjs';
import { TransferStateService } from '../../../core/services/transfer-state.service';
import { PlatformStateService } from '../../../core/services/platform-state.service';
import { ListResponse } from '../../../core/models/api/list-response.interface';
import { ArticleViewListFilters } from '../models/article-view-list-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesListService {
  public readonly restoredFromSever: boolean = false;
  private readonly limit = 6;
  private offset = 0;
  private readonly stateKey = 'catalog-articles';

  constructor(
    private platformState: PlatformStateService,
    private transferState: TransferStateService,
    private articlesApi: ArticlesApiService,
  ) {
    if (this.platformState.isBrowser && transferState.hasState(this.stateKey)) {
      const articlesResponse = transferState.getState<
        ListResponse<ArticleListItem>
      >(this.stateKey);

      this._totalCount.set(articlesResponse!.count);
      this._articlesList.set(articlesResponse!.items);

      this.restoredFromSever = true;
    }
  }

  public get canLoadMore(): boolean {
    return this.offset + this.articlesList.length < this.totalCount;
  }

  private _totalCount: WritableSignal<number> = signal(0);

  public get totalCount(): number {
    return this._totalCount();
  }

  private _articlesList: WritableSignal<ArticleListItem[]> = signal([]);

  public get articlesList(): ArticleListItem[] {
    return this._articlesList();
  }

  public fetchNextArticles(
    filters?: ArticleViewListFilters,
  ): Observable<unknown> {
    return this.articlesApi
      .getList({ ...filters, limit: this.limit, offset: this.offset })
      .pipe(
        tap((response) => {
          this._totalCount.set(response.count);
          this._articlesList.update((articles) => [
            ...articles,
            ...response.items,
          ]);

          this.offset += this.limit;

          if (this.platformState.isServer) {
            this.transferState.saveState(this.stateKey, response);
          }
        }),
      );
  }

  public resetList(): void {
    this._articlesList.set([]);
    this._totalCount.set(0);
    this.offset = 0;
  }
}
