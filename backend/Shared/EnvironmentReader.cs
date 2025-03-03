namespace Shared;

public static class EnvironmentReader
{
    public static string ReadEnvironmentVariable(string envPathVariable)
    {
        var value = Environment.GetEnvironmentVariable(envPathVariable);
        if (value == null) throw new Exception($"${envPathVariable} not specified");
        return value;
    }

    public static string ReadFileFromEnvironmentPath(string envPathVariable)
    {
        var filePath = ReadEnvironmentVariable(envPathVariable);
        return File.ReadAllText(filePath);
    }
}