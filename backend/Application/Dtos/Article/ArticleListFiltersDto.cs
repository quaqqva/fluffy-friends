namespace Application.Dtos.Article;

public record ArticleListFiltersDto(
    string? Title,
    int? MinPrice,
    int? MaxPrice,
    List<int>? Categories) : ListFiltersDto;