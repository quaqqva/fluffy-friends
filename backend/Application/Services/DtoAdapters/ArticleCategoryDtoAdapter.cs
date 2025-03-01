using System.Linq.Expressions;
using Application.Dtos.ArticleCategory;
using Domain.Entities;
using Shared;

namespace Application.Services.DtoAdapters;

public class ArticleCategoryDtoAdapter :
    BaseDtoAdapter<ArticleCategory, ArticleCategoryDto, ArticleCategoryCreateDto, ArticleCategoryDto,
        ArticleCategoryListFiltersDto>
{
    protected override Expression<Func<ArticleCategory, ArticleCategoryDto>> ListItemSelector => articleCategory =>
        new ArticleCategoryDto(
            articleCategory.Id,
            articleCategory.Name
        );

    public override ArticleCategoryDto ConvertToDto(ArticleCategory category)
    {
        return new ArticleCategoryDto(
            category.Id,
            category.Name);
    }

    public override ArticleCategory ConvertDtoToEntity(ArticleCategoryCreateDto dto, int id = 0)
    {
        return new ArticleCategory
        {
            Id = id,
            Name = dto.Name
        };
    }

    protected override Expression<Func<ArticleCategory, bool>> CreateFilter(ArticleCategoryListFiltersDto filters)
    {
        var predicate = PredicateBuilder.True<ArticleCategory>();

        if (!string.IsNullOrEmpty(filters.Name))
            predicate = predicate.And(articleCategory =>
                articleCategory.Name.ToLower().Contains(filters.Name!.ToLower()));

        return predicate;
    }
}