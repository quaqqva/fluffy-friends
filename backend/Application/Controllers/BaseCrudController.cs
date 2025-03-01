using Application.Dtos;
using Application.Interfaces;
using Domain.Interfaces;
using Infrastructure.Database.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers;

public abstract class BaseCrudController<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto>(
    IRepository<TEntity> repository,
    IDtoAdapter<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto> adapter)
    : ControllerBase
    where TEntity : class, IIdentifiable, new()
    where TListFiltersDto : ListFiltersDto
{
    [HttpPost("list")]
    public async Task<ActionResult<ListResponseDto<TListItemDto>>> GetEntitiesList(
        [FromBody] TListFiltersDto? filters)
    {
        var count = await repository.Count(adapter.ConvertToDbCountParams(filters));

        if (count <= 0) return Ok(new ListResponseDto<TListItemDto>(count, []));

        var entities = await repository.ReadList(adapter.ConvertToDbListParams(filters));
        return Ok(new ListResponseDto<TListItemDto>(count, entities));
    }

    [HttpGet(":id")]
    public async Task<ActionResult<TEntityDto>> GetEntity(int id)
    {
        var entity = await repository.Read(id);

        if (entity == null) return NotFound();

        return adapter.ConvertToDto(entity);
    }

    [HttpPost]
    public async Task<ActionResult<IdResponseDto>> CreateEntity([FromBody] TCreateDto createDto)
    {
        var id = await repository.Create(adapter.ConvertDtoToEntity(createDto));
        return Created(RouteData.Values["controller"]!.ToString() + id, new IdResponseDto(id));
    }

    [HttpPut(":id")]
    public async Task<ActionResult> UpdateEntity(int id, [FromBody] TCreateDto updateDto)
    {
        var article = adapter.ConvertDtoToEntity(updateDto, id);
        await repository.Update(article);
        return NoContent();
    }

    [HttpDelete(":id")]
    public async Task<ActionResult> DeleteEntity(int id)
    {
        await repository.Delete(id);
        return NoContent();
    }
}