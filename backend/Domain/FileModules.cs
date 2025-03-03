namespace Infrastructure.CloudStorage;

public class FileModule
{
    private FileModule(string value)
    {
        Value = value;
    }

    public string Value { get; }

    public static FileModule ArticlePhotos => new("article-photos");

    public static FileModule FromString(string value)
    {
        return value switch
        {
            "article-photos" => ArticlePhotos,
            _ => throw new ArgumentException("No such file module")
        };
    }

    public override string ToString()
    {
        return Value;
    }
}