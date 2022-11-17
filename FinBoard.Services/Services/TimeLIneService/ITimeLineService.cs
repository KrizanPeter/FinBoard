using FinBoard.Services.DTOs.Snapshot;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.TimeLIneService
{
    public interface ITimeLineService
    {
        Task<Result<List<SnapshotTimelineElementDto>>> ConstructTimeLine(Guid accountId);
    }
}
