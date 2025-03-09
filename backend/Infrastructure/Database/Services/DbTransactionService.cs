using Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infrastructure.Database.Services;

public class DbTransactionService(FluffyFriendsContext context) : IDbTransactionService
{
    private IDbContextTransaction? _transaction;

    public async Task BeginTransaction()
    {
        _transaction = await context.Database.BeginTransactionAsync();
    }

    public async Task CommitTransaction()
    {
        if (_transaction == null) return;
        await _transaction.CommitAsync();
        _transaction.Dispose();
        _transaction = null;
    }

    public async Task RollbackTransaction()
    {
        if (_transaction == null) return;
        await _transaction.RollbackAsync();
        _transaction.Dispose();
        _transaction = null;
    }
}