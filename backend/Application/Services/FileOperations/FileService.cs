using Application.Dtos;
using Domain.Interfaces.CloudStorage;
using Infrastructure.CloudStorage;
using File = Domain.Entities.File;

namespace Application.Services.FileOperations;

using File = File;

public class FileService(
    FileUnitOfWorkService fileUnitOfWorkService,
    ICloudStorageEnvironmentService cloudStorageEnvironmentService)
{
    public async Task<FileResponseDto> CreateFile(string fileName, string contentType, long size, string module,
        Stream stream)
    {
        var fileModule = FileModule.FromString(module);

        var fileEntity = new File
        {
            Name = fileName,
            Module = fileModule.Value,
            ContentType = contentType,
            Size = size
        };

        var fileId = await fileUnitOfWorkService.CreateFile(fileEntity, stream);
        fileEntity.Id = fileId;

        return new FileResponseDto(fileId, fileName, cloudStorageEnvironmentService.GetFileUrl(fileEntity));
    }
}