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
        var assembly = typeof(Article).Assembly;
        var entityTypes = assembly.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.GetInterfaces().Any(i => i.Name == "IIdentifiable"))
            .ToList();

        foreach (var entityType in entityTypes)
        {
            var repositoryType = typeof(IRepository<>).MakeGenericType(entityType);
            var repositoryImplementation = typeof(Repository<>).MakeGenericType(entityType);

            services.AddScoped(repositoryType, repositoryImplementation);
        }

        return services;
    }
}