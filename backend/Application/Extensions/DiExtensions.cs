using Application.Dtos;
using Application.Dtos.Article;
using Application.Dtos.ArticleCategory;
using Application.Dtos.ArticleComment;
using Application.Interfaces;
using Application.Services.DtoAdapters;
using Domain.Entities;

namespace Application.Extensions;

public static class DiExtensions
{
    public static void SetupDtoAdapters(this IServiceCollection services)
    {
        services.AddScoped<
            IDtoAdapter<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto, ArticleListFiltersDto>,
            ArticleDtoAdapter
        >();

        services.AddScoped<
            IDtoAdapter<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>,
            ArticleCommentDtoAdapter
        >();

        services.AddScoped<
            IDtoAdapter<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
                ArticleCategoryListFiltersDto>,
            ArticleCategoryDtoAdapter
        >();
    }
}