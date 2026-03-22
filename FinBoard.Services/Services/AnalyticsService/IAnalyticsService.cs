using FinBoard.Services.DTOs.Analytics;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.AnalyticsService
{
    public interface IAnalyticsService
    {
        Task<Result<List<AnalyticsTileDto>>> GetAnalyticsTilesAsync(Guid accountId);
        Task<Result> ReorderTilesAsync(List<ReorderAnalyticsTileDto> reorderList, Guid accountId);
    }
}
