using Application.Dtos;
using Domain.Interfaces;
using Infrastructure.Database.Queries;

namespace Application.Interfaces;

public interface IDtoAdapter<TEntity, out TEntityDto, in TCreateDto, TListItemDto, in TListFiltersDto>
    where TEntity : class, IIdentifiable, new() where TListFiltersDto : ListFiltersDto
{
    TEntityDto ConvertToDto(TEntity category);

    TEntity ConvertDtoToEntity(TCreateDto dto, int id = 0);

    DbCountParams<TEntity> ConvertToDbCountParams(TListFiltersDto? filtersDto);

    DbListParams<TEntity, TListItemDto> ConvertToDbListParams(TListFiltersDto? filterDto);
}