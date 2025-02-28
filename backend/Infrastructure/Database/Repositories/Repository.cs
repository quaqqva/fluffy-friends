using Domain.Interfaces;
using Infrastructure.Database.Exceptions;
using Infrastructure.Database.Interfaces;
using Infrastructure.Database.Queries;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories;

public class Repository<TEntity>(FluffyFriendsContext Context) : IRepository<TEntity>, IDisposable, IAsyncDisposable
    where TEntity : class, IIdentifiable
{
    protected readonly DbSet<TEntity> DbSet = Context.Set<TEntity>();

    public async ValueTask DisposeAsync()
    {
        await Context.DisposeAsync();
    }

    public void Dispose()
    {
        Context.Dispose();
    }

    public Task<int> Count(DbListParams<TEntity> listParams)
    {
        return BuildQuery<TEntity>(listParams).CountAsync();
    }

    public Task<TEntity?> Read(int id)
    {
        return DbSet.FirstOrDefaultAsync(entity => entity.Id == id);
    }

    public async Task<IEnumerable<TProjection>> ReadList<TProjection>(DbListParams<TEntity> listParams)
    {
        return await BuildQuery<TProjection>(listParams).Skip(listParams.Offset).Take(listParams.Limit).ToListAsync();
    }

    public async Task<int> Create(TEntity entity)
    {
        var createdEntity = DbSet.Add(entity);
        await Context.SaveChangesAsync();
        return createdEntity.Entity.Id;
    }

    public Task Update(TEntity entity)
    {
        DbSet.Attach(entity);
        Context.Entry(entity).State = EntityState.Modified;
        return Context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var readEntity = await Read(id);
        if (readEntity == null) throw new DbNotFoundException();

        DbSet.Remove(readEntity);
        await Context.SaveChangesAsync();
    }

    public Task Delete(TEntity entity)
    {
        if (Context.Entry(entity).State == EntityState.Detached) DbSet.Attach(entity);
        DbSet.Remove(entity);
        return Context.SaveChangesAsync();
    }

    private IQueryable<TProjection> BuildQuery<TProjection>(DbListParams<TEntity> listParams)
    {
        IQueryable<TEntity> query = DbSet;

        if (listParams.Filter != null) query = query.Where(listParams.Filter);

        if (listParams.IncludedProperties != null)
            query = listParams.IncludedProperties.Aggregate(query, (current, property) => current.Include(property));

        if (listParams.OrderBy != null) query = listParams.OrderBy(query);

        if (listParams.Select != null) return query.Select(listParams.Select).Cast<TProjection>();

        return query.Cast<TProjection>();
    }
}