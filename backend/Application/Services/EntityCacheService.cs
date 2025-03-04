using Application.Dtos;

namespace Application.Services;

public class EntityCacheService<TEntity, TEntityDto, TListItemDto>(CacheService cacheService)
{
    private readonly string _entityCacheKeyBase = $"entity_{typeof(TEntity).Name}";

    private readonly string _listCacheKeyBase = $"list_{typeof(TEntity).Name}";

    public async Task<TEntityDto?> GetEntity(int id)
    {
        return await cacheService.GetFromCache<TEntityDto>($"{_entityCacheKeyBase}_{id}");
    }

    public async Task SaveEntity(int id, TEntityDto entity)
    {
        await cacheService.SetToCache($"{_entityCacheKeyBase}_{id}", entity);
    }

    public async Task ClearEntityCache(int id)
    {
        await cacheService.RemoveFromCache($"{_entityCacheKeyBase}_{id}");
    }

    public Task<ListResponseDto<TEntity>?> GetList(string filtersJson)
    {
        return cacheService.GetFromCache<ListResponseDto<TEntity>>($"{_listCacheKeyBase}_{filtersJson}");
    }

    public async Task SaveList(string filtersJson, ListResponseDto<TListItemDto> entities)
    {
        await cacheService.SetToCache($"{_listCacheKeyBase}_{filtersJson}", entities);

        var cacheFiltersList = await cacheService.GetFromCache<HashSet<string>>($"list_{typeof(TEntity).Name}") ?? [];
        cacheFiltersList.Add(filtersJson);
        await cacheService.SetToCache($"list-filters_{typeof(TEntity).Name}", cacheFiltersList);
    }

    public async Task ClearListCache()
    {
        var cacheFiltersList = await cacheService.GetFromCache<HashSet<string>>($"list_{typeof(TEntity).Name}") ?? [];
        await Task.WhenAll(cacheFiltersList.Select(filtersJson =>
            cacheService.RemoveFromCache($"{_listCacheKeyBase}_{filtersJson}")));
        await cacheService.RemoveFromCache($"list-filters_{typeof(TEntity).Name}");
    }
}