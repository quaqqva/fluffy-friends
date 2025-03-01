using System.Linq.Expressions;

namespace Infrastructure.Database.Queries;

public record DbSelectParams<TEntity, TProjection>(Expression<Func<TEntity, TProjection>> Select);