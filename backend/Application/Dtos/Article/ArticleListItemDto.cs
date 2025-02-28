namespace Application.Dtos.Article;

public record ArticleListItemDto(
    int Id,
    string Title,
    DateTime PublishedAt,
    int Views,
    int Comments,
    int MinPrice,
    int MaxPrice,
    string Category);