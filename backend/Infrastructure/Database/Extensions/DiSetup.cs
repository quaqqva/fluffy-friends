using Domain.Entities;
using Domain.Interfaces.Database;
using Infrastructure.Database.Repositories;
using Infrastructure.Database.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Shared;

namespace Infrastructure.Database.Extensions;

public static class DiSetup
{
    public static void SetupDatabaseConnection(this IServiceCollection services)
    {
        var dbConnectionStringTemplate =
            EnvironmentReader.ReadEnvironmentVariable("ConnectionStrings__DefaultConnection");
        var password = EnvironmentReader.ReadFileFromEnvironmentPath("POSTGRES_PASSWORD_FILE");
        var dbConnectionString = dbConnectionStringTemplate + password;

        services.AddDbContext<FluffyFriendsContext>(options => options.UseNpgsql(dbConnectionString));
    }

    public static void AddRepositories(this IServiceCollection services)
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
    }

    public static void SetupDbServices(this IServiceCollection services)
    {
        services.AddScoped<IDbTransactionService, DbTransactionService>();
    }
}