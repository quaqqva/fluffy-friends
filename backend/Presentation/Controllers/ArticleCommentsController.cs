using Application.Dtos;
using Application.Dtos.Article;
using Application.Dtos.ArticleComment;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Interfaces.Database;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/articleComments")]
public class ArticleCommentsController(
    IRepository<ArticleComment> articleCommentsRepository,
    IDtoAdapter<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>
        articleCommentsDtoAdapter,
    EntityCacheService<ArticleComment, ArticleCommentDto, ArticleCommentDto> entityCacheService,
    EntityCacheService<Article, ArticleDto, ArticleListItemDto> articlesCacheService)
    : BaseCrudController<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>(
        articleCommentsRepository,
        articleCommentsDtoAdapter,
        entityCacheService)
{
    public override async Task<ActionResult<IdResponseDto>> CreateEntity(ArticleCommentCreateDto createDto)
    {
        var response = await base.CreateEntity(createDto);

        if (response.Result is CreatedResult)
            await Task.WhenAll(articlesCacheService.ClearListCache(),
                articlesCacheService.ClearEntityCache(createDto.ArticleId));

        return response;
    }
}