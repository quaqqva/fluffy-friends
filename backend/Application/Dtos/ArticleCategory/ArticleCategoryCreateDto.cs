using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.ArticleCategory;

public record ArticleCategoryCreateDto
{
    [Required] [MaxLength(255)] public string Name { get; set; }
}