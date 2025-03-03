using Domain.DatabaseParams;

namespace Domain.Interfaces.Database;

public interface IRepository<TEntity> where TEntity : class, IIdentifiable
{
    public Task<int> Count(DbCountParams<TEntity> listParams);

    public Task<TEntity?> Read(int id);

    public Task<TProjection?> Read<TProjection>(int id, DbSelectParams<TEntity, TProjection> selectParams);

    public Task<IEnumerable<TProjection>> ReadList<TProjection>(DbListParams<TEntity, TProjection> listParams);

    public Task<int> Create(TEntity entity);

    public Task Update(TEntity entity);

    public Task Delete(int id);

    public Task Delete(TEntity entity);
}