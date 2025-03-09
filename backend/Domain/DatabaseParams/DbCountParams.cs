using System.Linq.Expressions;

namespace Domain.DatabaseParams;

public record DbCountParams<TEntity>(Expression<Func<TEntity, bool>>? Filter = null);