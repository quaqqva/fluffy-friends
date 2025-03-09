using Domain.Interfaces.CloudStorage;
using Infrastructure.CloudStorage.Services;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using Shared;

namespace Infrastructure.CloudStorage.Extensions;

public static class DiSetup
{
    public static void SetupCloudStorageConnection(this IServiceCollection services)
    {
        var minioUser = EnvironmentReader.ReadFileFromEnvironmentPath("MINIO_ROOT_USER_FILE_PATH");
        var minioPassword = EnvironmentReader.ReadFileFromEnvironmentPath("MINIO_ROOT_PASSWORD_FILE_PATH");
        var minioEndpoint = EnvironmentReader.ReadEnvironmentVariable("MINIO_ENDPOINT");
        var minioPublicUrl = EnvironmentReader.ReadEnvironmentVariable("MINIO_PUBLIC_URL");
        var bucketName = EnvironmentReader.ReadEnvironmentVariable("MINIO_BUCKET");

        services.AddMinio(options =>
        {
            options.WithEndpoint(minioEndpoint).WithCredentials(minioUser, minioPassword).WithSSL(false).Build();
        });

        var minioEnvironment = new MinioStorageEnvironmentService(minioPublicUrl, minioEndpoint, bucketName);
        services.AddSingleton(minioEnvironment);
        services.AddSingleton<ICloudStorageEnvironmentService>(minioEnvironment);

        services.AddScoped<ICloudStorageService, MinioStorageService>();
    }
}