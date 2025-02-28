using System.Linq.Expressions;
using Application.Dtos.ArticleCategory;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database.Queries;
using Shared;

namespace Application.Services.DtoAdapters;

public class ArticleCategoryDtoAdapter :
    IDtoAdapter<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
        ArticleCategoryListFiltersDto>
{
    public ArticleCategoryDto ConvertToDto(ArticleCategory category)
    {
        return new ArticleCategoryDto(
            category.Id,
            category.Name);
    }

    public ArticleCategory ConvertDtoToEntity(ArticleCategoryCreateDto dto, int id = 0)
    {
        return new ArticleCategory
        {
            Id = id,
            Name = dto.Name
        };
    }

    public DbListParams<ArticleCategory> ConvertToDbListParams(ArticleCategoryListFiltersDto filterDto)
    {
        return new DbListParams<ArticleCategory>(
            Filter: CreateFilter(filterDto),
            Limit: filterDto.Limit ?? 10,
            Offset: filterDto.Offset ?? 0);
    }

    private Expression<Func<ArticleCategory, bool>> CreateFilter(ArticleCategoryListFiltersDto filters)
    {
        var predicate = PredicateBuilder.True<ArticleCategory>();

        if (!string.IsNullOrEmpty(filters.Name))
            predicate = predicate.And(articleCategory => articleCategory.Name.Contains(filters.Name));

        return predicate;
    }
}