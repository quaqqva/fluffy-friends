using Domain.Entities;
using Infrastructure.Database.Interfaces;
using Infrastructure.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Database.Extensions;

public static class DbSetup
{
    public static IServiceCollection SetupDatabaseConnection(this IServiceCollection services,
        string connectionStringTemplate)
    {
        services.AddDbContextPool<FluffyFriendsContext>(opt =>
            opt.UseNpgsql(connectionStringTemplate));
        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IRepository<Article>, ArticlesRepository>();
        services.AddScoped<IRepository<ArticleCategory>, Repository<ArticleCategory>>();
        services.AddScoped<IRepository<ArticleComment>, Repository<ArticleComment>>();

        return services;
    }
}