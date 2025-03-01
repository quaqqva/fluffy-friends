using System.Linq.Expressions;

namespace Infrastructure.Database.Queries;

public record DbCountParams<TEntity>(Expression<Func<TEntity, bool>>? Filter = null);