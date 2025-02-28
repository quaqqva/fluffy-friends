using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Interfaces;

namespace Domain.Entities;

public class Article : IIdentifiable
{
    [Required] [MaxLength(255)] public string Title { get; set; }

    [Required] [Column(TypeName = "text")] public string Content { get; set; }

    [Required] public DateTime PublishedAt { get; set; }

    public int Views { get; set; }

    public int MinPrice { get; set; }

    public int MaxPrice { get; set; }

    [Required] public int CategoryId { get; set; }

    public ArticleCategory? Category { get; set; }

    public ICollection<ArticleComment>? Comments { get; set; }

    [Key] public int Id { get; set; }
}