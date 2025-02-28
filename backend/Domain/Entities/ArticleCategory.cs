using System.ComponentModel.DataAnnotations;
using Domain.Interfaces;

namespace Domain.Entities;

public class ArticleCategory : IIdentifiable
{
    [MaxLength(25)] public string Name { get; set; }

    [Key] public int Id { get; set; }
}