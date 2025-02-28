using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.ArticleComment;

public record ArticleCommentCreateDto
{
    [Required] [MaxLength(255)] public string Author { get; set; }

    [Required] public string Content { get; set; }

    [Required] public int ArticleId { get; set; }
}