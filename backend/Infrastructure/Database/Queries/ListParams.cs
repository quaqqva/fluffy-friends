using System.Linq.Expressions;
using Domain.Interfaces;

namespace Infrastructure.Database.Queries;

public record DbListParams<TEntity>(
    Expression<Func<TEntity, dynamic>>? Select = null,
    Expression<Func<TEntity, bool>>? Filter = null,
    Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? OrderBy = null,
    IEnumerable<string>? IncludedProperties = null,
    int Limit = 10,
    int Offset = 0) where TEntity : class, IIdentifiable;