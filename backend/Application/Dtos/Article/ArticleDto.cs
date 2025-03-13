using Application.Dtos.ArticleComment;

namespace Application.Dtos.Article;

public record ArticleDto(
    int Id,
    string Title,
    string Content,
    DateTime PublishedAt,
    int Views,
    int? MinPrice,
    int? MaxPrice,
    string Category,
    string PhotoUrl,
    List<ArticleCommentDto> Comments
);