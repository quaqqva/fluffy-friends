using Application.Dtos.Article;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers;

[Route("api/articles")]
public class ArticlesController(
    IRepository<Article> articleRepository,
    IDtoAdapter<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto> articleDtoAdapter)
    : BaseCrudController<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto>(
        articleRepository,
        articleDtoAdapter)
{
}