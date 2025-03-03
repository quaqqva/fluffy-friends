using System.ComponentModel.DataAnnotations;
using Application.Dtos;
using Application.Interfaces;
using Domain.Interfaces;
using Domain.Interfaces.Database;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

public abstract class BaseCrudController<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto>(
    IRepository<TEntity> repository,
    IDtoAdapter<TEntity, TEntityDto, TCreateDto, TListItemDto, TListFiltersDto> adapter)
    : ControllerBase
    where TEntity : class, IIdentifiable
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

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TEntityDto>> GetEntity([FromRoute] int id)
    {
        var readEntity = await repository.Read(id, adapter.DbSelectParams);

        if (readEntity == null) return NotFound();

        return Ok(readEntity);
    }

    [HttpPost]
    public async Task<ActionResult<IdResponseDto>> CreateEntity([Required] [FromBody] TCreateDto createDto)
    {
        var id = await repository.Create(adapter.ConvertDtoToEntity(createDto));
        return Created(RouteData.Values["controller"]!.ToString() + id, new IdResponseDto(id));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateEntity([FromRoute] int id, [Required] [FromBody] TCreateDto updateDto)
    {
        var article = adapter.ConvertDtoToEntity(updateDto, id);
        await repository.Update(article);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteEntity([FromRoute] int id)
    {
        await repository.Delete(id);
        return NoContent();
    }
}