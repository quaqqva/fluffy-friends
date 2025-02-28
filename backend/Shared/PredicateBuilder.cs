using System.Linq.Expressions;

namespace Shared;

public static class PredicateBuilder
{
    public static Expression<Func<T, bool>> True<T>()
    {
        return param => true;
    }

    public static Expression<Func<T, bool>> False<T>()
    {
        return param => false;
    }

    public static Expression<Func<T, bool>> And<T>(
        this Expression<Func<T, bool>> expr1,
        Expression<Func<T, bool>> expr2)
    {
        var parameter = Expression.Parameter(typeof(T));

        var combined = Expression.Lambda<Func<T, bool>>(
            Expression.AndAlso(
                Expression.Invoke(expr1, parameter),
                Expression.Invoke(expr2, parameter)
            ),
            parameter
        );

        return combined;
    }
}