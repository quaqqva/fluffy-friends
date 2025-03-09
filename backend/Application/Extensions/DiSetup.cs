using Application.Dtos;
using Application.Dtos.Article;
using Application.Dtos.ArticleCategory;
using Application.Dtos.ArticleComment;
using Application.Interfaces;
using Application.Services;
using Application.Services.DtoAdapters;
using Application.Services.FileOperations;
using Domain.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class DiSetup
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

    public static void SetupCacheServices(this IServiceCollection services)
    {
        services.AddScoped<EntityCacheService<Article, ArticleDto, ArticleListItemDto>>();
        services.AddScoped<EntityCacheService<ArticleComment, ArticleCommentDto, ArticleCommentDto>>();
        services.AddScoped<EntityCacheService<ArticleCategory, ArticleCategoryDto, ArticleCategoryDto>>();
    }

    public static void SetupUtilityServices(this IServiceCollection services)
    {
        services.AddScoped<FileUnitOfWorkService>();
        services.AddScoped<FileService>();

        services.AddScoped<CacheService>();
    }
}