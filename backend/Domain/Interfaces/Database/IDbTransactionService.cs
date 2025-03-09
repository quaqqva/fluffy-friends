namespace Domain.Interfaces.Database;

public interface IDbTransactionService
{
    public Task BeginTransaction();

    public Task CommitTransaction();

    public Task RollbackTransaction();
}