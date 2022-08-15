﻿using FinBoard.Services.DTOs.DashBoardChart;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.DashboardService
{
    public interface IDashboardService
    {
        Task<Result> CreateDashboardChartAsync(CreateDashboardChartDto dto, Guid accountId);
        Task<Result<IEnumerable<DashboardChartDto>>> GetAllDashboardChartsAsync(Guid value);
    }
}