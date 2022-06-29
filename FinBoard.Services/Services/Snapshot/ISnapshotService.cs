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
        Task<Result<IEnumerable<SnapshotDto>>> GetAllMovesOfResourceAsync(Guid resourceId);
        Task<Result> CreateMoveForResourceAsync(CreateSnapshotDto moveDto);
        Task<Result> CheckValidityAsync(Guid moveId, Guid accountId);
        Task<Result> DeleteMoveAsync(Guid moveId);
    }
}
