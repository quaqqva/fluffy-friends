using Domain.Interfaces.CloudStorage;
using Shared;
using File = Domain.Entities.File;

namespace Infrastructure.CloudStorage.Services;

public class MinioStorageEnvironmentService(string publicUrl, string endpoint, string bucketName)
    : ICloudStorageEnvironmentService
{
    public string Endpoint => endpoint;

    public string BucketName => bucketName;

    public string GetFileUrl(File file)
    {
        var fileExtension = MimeTypeGuesser.GuessExtension(file.ContentType);
        return $"{publicUrl}/{bucketName}/{file.Module}/{file.Id}.{fileExtension}";
    }
}