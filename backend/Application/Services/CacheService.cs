using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace Application.Services;

public class CacheService(IDistributedCache distributedCache)
{
    private readonly DistributedCacheEntryOptions _cacheOptions = new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
    };

    public async Task<T?> GetFromCache<T>(string cacheKey)
    {
        var cachedData = await distributedCache.GetStringAsync(cacheKey);
        return cachedData is null ? default : JsonSerializer.Deserialize<T>(cachedData);
    }

    public async Task SetToCache<T>(string cacheKey, T data)
    {
        var jsonData = JsonSerializer.Serialize(data);
        await distributedCache.SetStringAsync(cacheKey, jsonData, _cacheOptions);
    }

    public async Task RemoveFromCache(string cacheKey)
    {
        await distributedCache.RemoveAsync(cacheKey);
    }
}