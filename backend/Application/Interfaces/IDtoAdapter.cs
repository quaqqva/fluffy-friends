using Domain.Interfaces;
using Infrastructure.Database.Queries;

namespace Application.Interfaces;

public interface IDtoAdapter<TEntity, out TEntityDto, in TCreateDto, TListItemDto, in TListFiltersDto>
    where TEntity : class, IIdentifiable
{
    TEntityDto ConvertToDto(TEntity category);

    TEntity ConvertDtoToEntity(TCreateDto dto, int id = 0);

    DbListParams<TEntity> ConvertToDbListParams(TListFiltersDto filterDto);
}