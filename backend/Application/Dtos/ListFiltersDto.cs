namespace Application.Dtos;

public record ListFiltersDto
{
    public int? Limit { get; set; }

    public int? Offset { get; set; }
}