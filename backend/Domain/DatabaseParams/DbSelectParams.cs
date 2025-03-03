using System.Linq.Expressions;

namespace Domain.DatabaseParams;

public record DbSelectParams<TEntity, TProjection>(Expression<Func<TEntity, TProjection>> Select);