using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Shared;

namespace Infrastructure.Database;

public class FluffyFriendsContextFactory : IDesignTimeDbContextFactory<FluffyFriendsContext>
{
    public FluffyFriendsContext CreateDbContext(string[] args)
    {
        var dbConnectionStringTemplate =
            EnvironmentReader.ReadEnvironmentVariable("ConnectionStrings__DefaultConnection");
        var password = EnvironmentReader.ReadFileFromEnvironmentPath("POSTGRES_PASSWORD_FILE");
        var dbConnectionString = dbConnectionStringTemplate + password;

        var optionsBuilder = new DbContextOptionsBuilder<FluffyFriendsContext>();
        optionsBuilder.UseNpgsql(dbConnectionString);

        return new FluffyFriendsContext(optionsBuilder.Options);
    }
}