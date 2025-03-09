using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Interfaces;
using Domain.Interfaces.Database;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

public abstract class BaseCrudController<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto>(
    IRepository<TEntity> repository,
    IDtoAdapter<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto> adapter,
    EntityCacheService<TEntity, TEntityDto, TListItemDto> cacheService
)
    : ControllerBase
    where TEntity : class, IIdentifiable
    where TListFiltersDto : ListFiltersDto
{
    [HttpPost("list")]
    public async Task<ActionResult<ListResponseDto<TListItemDto>>> GetEntitiesList(
        [FromBody] TListFiltersDto? filters)
    {
        var filtersJson = JsonSerializer.Serialize(filters);

        var cachedList = await cacheService.GetList(filtersJson);
        if (cachedList is not null) return Ok(cachedList);

        var count = await repository.Count(adapter.ConvertToDbCountParams(filters));
        var entities = count <= 0 ? [] : await repository.ReadList(adapter.ConvertToDbListParams(filters));
        var response = new ListResponseDto<TListItemDto>(count, entities);

        await cacheService.SaveList(filtersJson, response);
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TEntityDto>> GetEntity([FromRoute] int id)
    {
        var cachedEntity = await cacheService.GetEntity(id);
        if (cachedEntity is not null) return Ok(cachedEntity);

        var readEntity = await repository.Read(id, adapter.DbSelectParams);
        if (readEntity == null) return NotFound();

        await cacheService.SaveEntity(id, readEntity);
        return Ok(readEntity);
    }

    [HttpPost]
    public async Task<ActionResult<IdResponseDto>> CreateEntity([Required] [FromBody] TCreateDto createDto)
    {
        var id = await repository.Create(adapter.ConvertDtoToEntity(createDto));
        await Task.WhenAll(cacheService.ClearEntityCache(id), cacheService.ClearListCache());

        return Created(RouteData.Values["controller"]!.ToString() + id, new IdResponseDto(id));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateEntity([FromRoute] int id, [Required] [FromBody] TCreateDto updateDto)
    {
        var entity = adapter.ConvertDtoToEntity(updateDto, id);
        await repository.Update(entity);

        await Task.WhenAll(cacheService.ClearEntityCache(id), cacheService.ClearListCache());

        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteEntity([FromRoute] int id)
    {
        await repository.Delete(id);

        await Task.WhenAll(cacheService.ClearEntityCache(id), cacheService.ClearListCache());

        return NoContent();
    }
}