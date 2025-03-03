using System.Linq.Expressions;
using Application.Dtos;
using Application.Dtos.ArticleComment;
using Domain.DatabaseParams;
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

    public override DbSelectParams<ArticleComment, ArticleCommentDto> DbSelectParams => new(
        comment => new ArticleCommentDto(
            comment.Id,
            comment.Author,
            comment.CreatedAt,
            comment.Content,
            comment.ArticleId
        ));

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