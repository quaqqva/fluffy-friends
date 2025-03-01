using System.Linq.Expressions;
using Application.Dtos;
using Application.Dtos.Article;
using Application.Dtos.ArticleComment;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database.Queries;
using Shared;

namespace Application.Services.DtoAdapters;

public class ArticleDtoAdapter(
    IDtoAdapter<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>
        commentsAdapter
) : BaseDtoAdapter<Article, ArticleDto, ArticleCreateDto, ArticleListItemDto,
    ArticleListFiltersDto>
{
    protected override Expression<Func<Article, ArticleListItemDto>> ListItemSelector =>
        article => new ArticleListItemDto(
            article.Id,
            article.Title,
            article.PublishedAt,
            article.Views,
            article.Comments!.Count,
            article.MinPrice,
            article.MaxPrice,
            article.Category!.Name
        );

    public override DbSelectParams<Article, ArticleDto> DbSelectParams
    {
        get
        {
            return new DbSelectParams<Article, ArticleDto>(article => new ArticleDto(
                article.Id,
                article.Title,
                article.Content,
                article.PublishedAt,
                article.Views,
                article.MinPrice,
                article.MaxPrice,
                article.Category!.Name,
                article.Comments!.AsQueryable().Select(commentsAdapter.DbSelectParams.Select).ToList()));
        }
    }

    public override Article ConvertDtoToEntity(ArticleCreateDto articleCreateDto, int id = 0)
    {
        return new Article
        {
            Id = id,
            Title = articleCreateDto.Title,
            Content = articleCreateDto.Content,
            MinPrice = articleCreateDto.MinPrice,
            MaxPrice = articleCreateDto.MaxPrice,
            CategoryId = articleCreateDto.Category,
            PublishedAt = DateTime.UtcNow
        };
    }

    protected override Expression<Func<Article, bool>> CreateFilter(ArticleListFiltersDto filters)
    {
        var predicate = PredicateBuilder.True<Article>();

        if (!string.IsNullOrEmpty(filters.Title))
            predicate = predicate.And(article => article.Title.ToLower().Contains(filters.Title.ToLower()));

        if (filters.MinPrice.HasValue) predicate = predicate.And(article => article.MinPrice >= filters.MinPrice.Value);

        if (filters.MaxPrice.HasValue) predicate = predicate.And(article => article.MaxPrice <= filters.MaxPrice.Value);

        if (filters.Categories != null && filters.Categories.Any())
            predicate = predicate.And(article => filters.Categories.Contains(article.Category!.Id));

        return predicate;
    }
}