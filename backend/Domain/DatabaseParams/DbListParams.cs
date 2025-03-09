using System.Linq.Expressions;
using Domain.Interfaces;

namespace Domain.DatabaseParams;

public record DbListParams<TEntity, TSelectProjection>(
    int Limit,
    int Offset,
    Expression<Func<TEntity, TSelectProjection>>? Select = null,
    Expression<Func<TEntity, bool>>? Filter = null,
    Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? OrderBy = null) where TEntity : class, IIdentifiable;