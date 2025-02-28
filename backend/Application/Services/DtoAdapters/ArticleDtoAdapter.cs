using System.Linq.Expressions;
using Application.Dtos.Article;
using Application.Interfaces;
using Application.Services.DtoAdapters;
using Domain.Entities;
using Infrastructure.Database.Queries;
using Shared;

namespace Application.Services;

public class ArticleDtoAdapter : IDtoAdapter<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto,
    ArticleListFiltersDto>
{
    public Article ConvertDtoToEntity(ArticleCreateDto articleCreateDto, int id = 0)
    {
        return new Article
        {
            Id = id,
            Title = articleCreateDto.Title,
            Content = articleCreateDto.Content,
            MinPrice = articleCreateDto.MinPrice,
            MaxPrice = articleCreateDto.MaxPrice,
            CategoryId = articleCreateDto.Category,
            PublishedAt = DateTime.Now
        };
    }

    public ArticleDto ConvertToDto(Article category)
    {
        var commentAdapter = new ArticleCommentDtoAdapter();

        return new ArticleDto(
            category.Id,
            category.Title,
            category.Content,
            category.PublishedAt,
            category.Views,
            Comments: category.Comments!.Select(articleComment => commentAdapter.ConvertToDto(articleComment)).ToList(),
            MinPrice: category.MinPrice,
            MaxPrice: category.MaxPrice,
            Category: category.Category!.Name);
    }

    public DbListParams<Article> ConvertToDbListParams(ArticleListFiltersDto filters)
    {
        Expression<Func<Article, dynamic>> selector = article => new ArticleListItemDto(
            article.Id,
            article.Title,
            article.PublishedAt,
            article.Views,
            article.Comments!.Count,
            article.MinPrice,
            article.MaxPrice,
            article.Category!.Name
        );

        DbListParams<Article> result = new(
            selector,
            CreateFilter(filters),
            Limit: filters.Limit ?? 10,
            Offset: filters.Offset ?? 0);
        return result;
    }

    private Expression<Func<Article, bool>> CreateFilter(ArticleListFiltersDto filters)
    {
        var predicate = PredicateBuilder.True<Article>();

        if (!string.IsNullOrEmpty(filters.Title))
            predicate = predicate.And(article => article.Title.Contains(filters.Title));

        if (filters.MinPrice.HasValue) predicate = predicate.And(article => article.MinPrice >= filters.MinPrice.Value);

        if (filters.MaxPrice.HasValue) predicate = predicate.And(article => article.MaxPrice <= filters.MaxPrice.Value);

        if (filters.Categories != null && filters.Categories.Any())
            predicate = predicate.And(article => filters.Categories.Contains(article.Category!.Id));

        return predicate;
    }
}