using System.Linq.Expressions;
using Application.Dtos;
using Application.Dtos.ArticleComment;
using Domain.Entities;

namespace Application.Services.DtoAdapters;

public class ArticleCommentDtoAdapter :
    BaseDtoAdapter<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>
{
    protected override Expression<Func<ArticleComment, ArticleCommentDto>> ListItemSelector => comment =>
        new ArticleCommentDto(
            comment.Id,
            comment.Author,
            comment.CreatedAt,
            comment.Content,
            comment.ArticleId);

    public override ArticleCommentDto ConvertToDto(ArticleComment category)
    {
        return new ArticleCommentDto(
            category.Id,
            category.Author,
            Content: category.Content,
            CreatedAt: category.CreatedAt,
            ArticleId: category.ArticleId
        );
    }

    public override ArticleComment ConvertDtoToEntity(ArticleCommentCreateDto createDto, int id = 0)
    {
        return new ArticleComment
        {
            Author = createDto.Author,
            Content = createDto.Content,
            ArticleId = createDto.ArticleId,
            CreatedAt = DateTime.UtcNow
        };
    }
}