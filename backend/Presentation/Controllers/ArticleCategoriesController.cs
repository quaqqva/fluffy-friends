using Application.Dtos.ArticleCategory;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Interfaces.Database;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/articleCategories")]
public class ArticleCategoriesController(
    IRepository<ArticleCategory> articleCategoriesRepository,
    IDtoAdapter<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
            ArticleCategoryListFiltersDto>
        articleCategoriesDtoAdapter,
    EntityCacheService<ArticleCategory, ArticleCategoryDto, ArticleCategoryDto> entityCacheService)
    : BaseCrudController<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
        ArticleCategoryListFiltersDto>(
        articleCategoriesRepository,
        articleCategoriesDtoAdapter,
        entityCacheService)
{
}