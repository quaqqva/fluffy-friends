using Domain.Interfaces.CloudStorage;
using Minio;
using Minio.DataModel.Args;
using Shared;
using File = Domain.Entities.File;

namespace Infrastructure.CloudStorage.Services;

public class MinioStorageService(IMinioClient minioClient, MinioStorageEnvironmentService environment)
    : ICloudStorageService
{
    public async Task UploadFile(File file, Stream stream)
    {
        await EnsureBucketExistsAsync();

        var fileExtension = MimeTypeGuesser.GuessExtension(file.ContentType);
        await minioClient.PutObjectAsync(new PutObjectArgs()
            .WithBucket(environment.BucketName)
            .WithObject($"{file.Module}/{file.Id.ToString()}.{fileExtension}")
            .WithStreamData(stream)
            .WithObjectSize(file.Size)
            .WithContentType(file.ContentType)
        );
    }

    private async Task EnsureBucketExistsAsync()
    {
        var bucketExists =
            await minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(environment.BucketName));
        if (!bucketExists) throw new Exception("Bucket not created");
    }
}