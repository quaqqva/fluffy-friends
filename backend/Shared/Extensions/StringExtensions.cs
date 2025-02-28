using System.Text.RegularExpressions;

namespace Shared.Extensions;

public static class StringExtensions
{
    public static string ToPascalCase(this string str)
    {
        return Regex.Replace(str, @"\b\p{Ll}", match => match.Value.ToUpper());
    }

    public static string ToCamelCase(this string str)
    {
        return char.ToLowerInvariant(str[0]) + str[1..];
    }
}