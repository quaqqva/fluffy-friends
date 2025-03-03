using System.ComponentModel.DataAnnotations;
using Domain.Interfaces;

namespace Domain.Entities;

public class File : IIdentifiable
{
    [Required] [MaxLength(255)] public string Name { get; set; }

    [Required] [MaxLength(100)] public string Module { get; set; }

    [Required] [MaxLength(255)] public string ContentType { get; set; }

    [Required] public long Size { get; set; }

    [Key] [Required] public int Id { get; set; }
}