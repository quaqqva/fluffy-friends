using File = Domain.Entities.File;

namespace Domain.Interfaces.CloudStorage;

public interface ICloudStorageEnvironmentService
{
    public string GetFileUrl(File file);
}