using Microsoft.Extensions.DependencyInjection;
using Shared;

namespace Infrastructure.Cache.Extensions;

public static class DiSetup
{
    public static void SetupDistributedCache(this IServiceCollection services)
    {
        services.AddStackExchangeRedisCache(
            options =>
            {
                options.Configuration = EnvironmentReader.ReadEnvironmentVariable("REDIS_ENDPOINT");
                options.InstanceName = EnvironmentReader.ReadEnvironmentVariable("REDIS_INSTANCE_NAME");
            });
    }
}