using System.Linq.Expressions;
using Application.Dtos;
using Application.Interfaces;
using Domain.DatabaseParams;
using Domain.Interfaces;
using Shared;

namespace Application.Services.DtoAdapters;

public abstract class
    BaseDtoAdapter<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto> : IDtoAdapter<TEntity, TEntityDto,
    TCreateDto, TListItemDto, TListFiltersDto>
    where TEntity : class, IIdentifiable
    where TListFiltersDto : ListFiltersDto
{
    private const int DefaultLimit = 10;

    private const int DefaultOffset = 0;

    protected abstract Expression<Func<TEntity, TListItemDto>> ListItemSelector { get; }

    public abstract DbSelectParams<TEntity, TEntityDto> DbSelectParams { get; }

    public abstract TEntity ConvertDtoToEntity(TCreateDto dto, int id = 0);

    public DbCountParams<TEntity> ConvertToDbCountParams(TListFiltersDto? filtersDto)
    {
        return new DbCountParams<TEntity>(
            filtersDto == null ? null : CreateFilter(filtersDto));
    }

    public DbListParams<TEntity, TListItemDto> ConvertToDbListParams(TListFiltersDto? filterDto)
    {
        return new DbListParams<TEntity, TListItemDto>(
            Select: ListItemSelector,
            Filter: filterDto == null ? null : CreateFilter(filterDto),
            Limit: filterDto?.Limit ?? DefaultLimit,
            Offset: filterDto?.Offset ?? DefaultOffset);
    }

    protected virtual Expression<Func<TEntity, bool>> CreateFilter(TListFiltersDto filters)
    {
        return PredicateBuilder.True<TEntity>();
    }
}