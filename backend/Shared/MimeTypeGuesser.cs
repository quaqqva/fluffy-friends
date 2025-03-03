using HeyRed.Mime;

namespace Shared;

public static class MimeTypeGuesser
{
    public static string? GuessExtension(string mimeType)
    {
        return MimeTypesMap.GetExtension(mimeType);
    }
}