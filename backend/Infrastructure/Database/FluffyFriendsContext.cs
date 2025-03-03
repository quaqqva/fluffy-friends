using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using File = Domain.Entities.File;

namespace Infrastructure.Database;

public class FluffyFriendsContext(DbContextOptions<FluffyFriendsContext> options) : DbContext(options)
{
    public DbSet<Article> Articles { get; set; }

    public DbSet<ArticleCategory> ArticleCategories { get; set; }

    public DbSet<ArticleComment> ArticleComments { get; set; }

    public DbSet<File> Files { get; set; }
}