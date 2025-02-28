using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Interfaces;

namespace Domain.Entities;

public class ArticleComment : IIdentifiable
{
    public DateTime CreatedAt { get; set; }

    [Required] [MaxLength(255)] public string Author { get; set; }

    [Required] [Column(TypeName = "text")] public string Content { get; set; }

    [Required] public int ArticleId { get; set; }

    public Article? Article { get; set; }

    [Key] public int Id { get; set; }
}