using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories;

public class ArticlesRepository(FluffyFriendsContext context) : Repository<Article>(context)
{
    public override Task<Article?> Read(int id)
    {
        return DbSet
            .Include(article => article.Category)
            .Include(article => article.Comments)
            .FirstOrDefaultAsync(entity => entity.Id == id);
        return base.Read(id);
    }
}