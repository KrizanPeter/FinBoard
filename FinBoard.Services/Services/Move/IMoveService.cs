using FinBoard.Services.DTOs.Move;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.Move
{
    public interface IMoveService
    {
        Task<Result<IEnumerable<MoveDto>>> GetAllMovesOfResourceAsync(Guid resourceId);
        Task<Result> CreateMoveForResourceAsync(CreateMoveDto moveDto);
        Task<Result> CheckValidityAsync(Guid moveId, Guid accountId);
        Task<Result> DeleteMoveAsync(Guid moveId);
    }
}
