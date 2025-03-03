using File = Domain.Entities.File;

namespace Domain.Interfaces.CloudStorage;

public interface ICloudStorageService
{
    public Task UploadFile(File file, Stream stream);
}