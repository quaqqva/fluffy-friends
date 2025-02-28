using Application.Dtos;
using Application.Dtos.ArticleComment;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database.Queries;

namespace Application.Services.DtoAdapters;

public class ArticleCommentDtoAdapter :
    IDtoAdapter<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>
{
    public ArticleCommentDto ConvertToDto(ArticleComment category)
    {
        return new ArticleCommentDto(
            category.Id,
            category.Author,
            Content: category.Content,
            CreatedAt: category.CreatedAt,
            ArticleId: category.ArticleId
        );
    }

    public ArticleComment ConvertDtoToEntity(ArticleCommentCreateDto createDto, int id = 0)
    {
        return new ArticleComment
        {
            Author = createDto.Author,
            Content = createDto.Content,
            ArticleId = createDto.ArticleId,
            CreatedAt = DateTime.Now
        };
    }

    public DbListParams<ArticleComment> ConvertToDbListParams(ListFiltersDto filterDto)
    {
        return new DbListParams<ArticleComment>(
            Limit: filterDto.Limit ?? 10,
            Offset: filterDto.Offset ?? 0);
    }
}