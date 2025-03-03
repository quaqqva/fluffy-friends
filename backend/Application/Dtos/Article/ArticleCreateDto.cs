using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.Article;

public record ArticleCreateDto
{
    [Required] [MaxLength(255)] public string Title { get; set; }

    [Required] public string Content { get; set; }

    public int MinPrice { get; set; }

    public int MaxPrice { get; set; }

    [Required] public int Category { get; set; }


    [Required] public int PhotoId { get; set; }
}