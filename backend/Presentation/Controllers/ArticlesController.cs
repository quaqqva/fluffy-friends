using Application.Dtos.Article;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Interfaces.Database;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/articles")]
public class ArticlesController(
    IRepository<Article> articleRepository,
    IDtoAdapter<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto> articleDtoAdapter,
    EntityCacheService<Article, ArticleDto, ArticleListItemDto> entityCacheService)
    : BaseCrudController<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto>(
        articleRepository,
        articleDtoAdapter,
        entityCacheService)
{
}