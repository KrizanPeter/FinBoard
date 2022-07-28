using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Dashboard;
using FinBoard.Services.DTOs.DashBoardChart;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.DashboardService
{
    public class DashboardService : IDashboardService
    {
        private readonly ILogger<DashboardService> _logger;
        private readonly IDashboardRepository _dashboardRepository;
        private readonly IMapper _mapper;

        public DashboardService(ILogger<DashboardService> logger, IDashboardRepository dashboardRepository, IMapper mapper)
        {
            _logger = logger;
            _dashboardRepository = dashboardRepository;
            _mapper = mapper;
        }

        public async Task<Result> CreateDashboardChartAsync(CreateDashboardChartDto dashboardChartDto, Guid accountId)
        {
            if (dashboardChartDto == null)
            {
                return Result.Fail("Resource Dto cannot be null.");
            }
            var dashboardChartentity = _mapper.Map<DashboardChart>(dashboardChartDto);
            dashboardChartentity.AccountId = accountId;

            try
            {
                await _dashboardRepository.AddAsync(dashboardChartentity);
                _dashboardRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        public async Task<Result<IEnumerable<DashboardChartDto>>> GetAllDashboardChartsAsync(Guid accountId)
        {
            var result = await _dashboardRepository.GetAllAsync(a => a.AccountId == accountId);
            var resultDto = _mapper.Map<IEnumerable<DashboardChartDto>>(result);

            if (result != null)
            {
                return Result.Ok(resultDto);
            }
            return Result.Fail<IEnumerable<DashboardChartDto>>("Any Data for specific account.");
        }
    }
}
