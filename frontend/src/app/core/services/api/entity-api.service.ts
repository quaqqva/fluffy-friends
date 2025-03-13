import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { getMockup } from '../../../shared/utils/get-mockup';
import { IdResponse } from '../../models/api/id-reponse.interface';
import { IdMockup } from '../../mockups/id.mockup';
import { ListResponse } from '../../models/api/list-response.interface';
import { ListFilters } from '../../models/api/list-filters.interface';

export abstract class EntityApiService<
  TEntity,
  TEntityCreateBody,
  TListFilters = ListFilters,
  TEntityListItem = TEntity,
> {
  protected abstract listMockup: ListResponse<TEntityListItem>;

  protected abstract infoMockup: TEntity;

  protected abstract apiUrl: string;

  protected constructor(private api: ApiService) {}

  public getList(
    listFilters: TListFilters,
  ): Observable<ListResponse<TEntityListItem>> {
    const path = `${this.apiUrl}/list`;

    const mockupData = getMockup(path, this.listMockup, listFilters);

    const requestData = {
      path,
      body: listFilters,
      mockupData,
    };

    return this.api.post(requestData);
  }

  public getInfo(id: string): Observable<TEntity> {
    const path = `${this.apiUrl}/${id}`;

    const mockupData = getMockup(path, this.infoMockup);

    const requestData = {
      path,
      mockupData,
    };

    return this.api.get(requestData);
  }

  public create(body: TEntityCreateBody): Observable<IdResponse> {
    const path = this.apiUrl;

    const mockupData = getMockup(path, IdMockup.response.success, body);

    const requestData = {
      path,
      mockupData,
      body,
    };

    return this.api.post(requestData);
  }
}
