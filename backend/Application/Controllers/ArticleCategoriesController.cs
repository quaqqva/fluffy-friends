using Application.Dtos.ArticleCategory;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers;

[Route("api/articleCategories")]
public class ArticleCategoriesController(
    IRepository<ArticleCategory> articleCategoriesRepository,
    IDtoAdapter<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
            ArticleCategoryListFiltersDto>
        articleCategoriesDtoAdapter)
    : BaseCrudController<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
        ArticleCategoryListFiltersDto>(
        articleCategoriesRepository,
        articleCategoriesDtoAdapter)
{
}