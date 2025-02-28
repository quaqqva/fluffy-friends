namespace Application.Dtos;

public record ListResponseDto<T>(int Count, IEnumerable<T> Items);