using Domain.Interfaces.CloudStorage;
using Domain.Interfaces.Database;
using File = Domain.Entities.File;

namespace Application.Services.FileOperations;

public class FileUnitOfWorkService(
    ICloudStorageService cloudStorageService,
    IRepository<File> fileRepository,
    IDbTransactionService transactionService)
{
    public async Task<int> CreateFile(File file, Stream stream)
    {
        await transactionService.BeginTransaction();
        try
        {
            var id = await fileRepository.Create(file);
            file.Id = id;

            await cloudStorageService.UploadFile(file, stream);
            await transactionService.CommitTransaction();
            return id;
        }
        catch
        {
            await transactionService.RollbackTransaction();
            throw;
        }
    }
}