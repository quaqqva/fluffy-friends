using Application.Dtos.Article;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces.Database;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/articles")]
public class ArticlesController(
    IRepository<Article> articleRepository,
    IDtoAdapter<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto> articleDtoAdapter)
    : BaseCrudController<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto>(
        articleRepository,
        articleDtoAdapter)
{
}