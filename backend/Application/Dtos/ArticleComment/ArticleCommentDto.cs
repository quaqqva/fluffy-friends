namespace Application.Dtos.ArticleComment;

public record ArticleCommentDto(int Id, string Author, DateTime CreatedAt, string Content, int ArticleId);