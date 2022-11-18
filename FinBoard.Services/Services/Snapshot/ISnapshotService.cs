using FinBoard.Domain.Entities;
using FinBoard.Services.DTOs.Account;
using FinBoard.Services.DTOs.Move;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.Move
{
    public interface ISnapshotService
    {
        Task<Result<IEnumerable<SnapshotDto>>> GetAllSnapshotsOfResourceAsync(Guid resourceId);
        Task<Result> CreateSnapshotForResourceAsync(CreateSnapshotDto moveDto, Guid accountId);
        Task<Result> CheckValidityAsync(Guid moveId, Guid accountId);
        Task<Result> DeleteSnapshotAsync(Guid moveId);
        Task<Result<IEnumerable<SnapshotDto>>> GetAllSnapshotsForDate(Guid value, DateTime date);
        ICollection<Snapshot> GenerateSnapshotsForAccount(AccountBaseDataDto accountInfo);
        Task<Result> DeleteAccountsSnapshots(Guid accountId);
    }
}
