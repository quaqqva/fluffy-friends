using System.Linq.Expressions;
using Domain.Interfaces;
using Infrastructure.Database.Exceptions;
using Infrastructure.Database.Interfaces;
using Infrastructure.Database.Queries;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories;

public class Repository<TEntity>(FluffyFriendsContext context) : IRepository<TEntity>, IDisposable, IAsyncDisposable
    where TEntity : class, IIdentifiable
{
    protected readonly DbSet<TEntity> DbSet = context.Set<TEntity>();

    public async ValueTask DisposeAsync()
    {
        await context.DisposeAsync();
    }

    public void Dispose()
    {
        context.Dispose();
    }

    public Task<TEntity?> Read(int id)
    {
        return DbSet.FirstOrDefaultAsync(entity => entity.Id == id);
    }

    public async Task<IEnumerable<TProjection>> ReadList<TProjection>(DbListParams<TEntity, TProjection> listParams)
    {
        return await BuildQuery(
            listParams.Select,
            listParams.Filter,
            includedProperties: listParams.IncludedProperties,
            orderBy: listParams.OrderBy
        ).Skip(listParams.Offset).Take(listParams.Limit).ToListAsync();
    }

    public async Task<int> Create(TEntity entity)
    {
        var createdEntity = DbSet.Add(entity);
        await context.SaveChangesAsync();
        return createdEntity.Entity.Id;
    }

    public Task Update(TEntity entity)
    {
        DbSet.Attach(entity);
        context.Entry(entity).State = EntityState.Modified;
        return context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var readEntity = await Read(id);
        if (readEntity == null) throw new DbNotFoundException();

        DbSet.Remove(readEntity);
        await context.SaveChangesAsync();
    }

    public Task Delete(TEntity entity)
    {
        if (context.Entry(entity).State == EntityState.Detached) DbSet.Attach(entity);
        DbSet.Remove(entity);
        return context.SaveChangesAsync();
    }

    public Task<int> Count(DbCountParams<TEntity> countParams)
    {
        return BuildQuery<TEntity>(
            filter: countParams.Filter,
            includedProperties: countParams.IncludedProperties
        ).CountAsync();
    }

    public Task<TProjection?> Read<TProjection>(int id, DbSelectParams<TEntity, TProjection> selectParams)
    {
        return BuildQuery(selectParams.Select, entity => entity.Id == id).FirstOrDefaultAsync();
    }

    private IQueryable<TProjection> BuildQuery<TProjection>(
        Expression<Func<TEntity, TProjection>>? select = null,
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        IEnumerable<string>? includedProperties = null)
    {
        IQueryable<TEntity> query = DbSet;

        if (filter != null) query = query.Where(filter);

        if (includedProperties != null)
            query = includedProperties.Aggregate(query, (current, property) => current.Include(property));

        if (orderBy != null) query = orderBy(query);

        if (select != null) return query.Select(select).Cast<TProjection>();

        return query.Cast<TProjection>();
    }
}