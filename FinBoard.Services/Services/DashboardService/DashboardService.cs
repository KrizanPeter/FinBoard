using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Dashboard;
using FinBoard.Domain.Repositories.ResourceGroup;
using FinBoard.Services.DTOs.DashBoardChart;
using FinBoard.Services.DTOs.Move;
using FinBoard.Services.DTOs.Resource;
using FinBoard.Services.Services.Move;
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
        private readonly IResourceGroupRepository _resourceGroupRepository;
        private readonly ISnapshotService _snapshotService;
        private readonly IMapper _mapper;

        public DashboardService(ILogger<DashboardService> logger,
            IDashboardRepository dashboardRepository,
            IMapper mapper,
            IResourceGroupRepository resourceGroupRepository,
            ISnapshotService snapshotService)
        {
            _resourceGroupRepository = resourceGroupRepository;
            _logger = logger;
            _dashboardRepository = dashboardRepository;
            _mapper = mapper;
            _snapshotService = snapshotService;
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

        public async Task<Result> CheckValidityAsync(Guid dashboardId, Guid accountId)
        {
            var result = await _dashboardRepository.GetAllAsync(a => a.AccountId == accountId && a.DashboardChartId == dashboardId);
            if (result.Any())
            {
                return Result.Ok();
            }
            return Result.Fail("Resource does not belong under your account.");
        }

        public async Task<Result> DeleteDashboardChartAsync(Guid dashboardId)
        {
            var result = await _dashboardRepository.GetFirstOrDefaultAsync(a => a.DashboardChartId == dashboardId);
            if (result == null)
            {
                return Result.Fail("Resource with specified ID not exist.");
            }
            try
            {
                _dashboardRepository.Remove(result);
                _dashboardRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
            return Result.Ok();
        }

        //TODO : U know... there is special place in hell for people who wrote code like this
        public async Task<Result<DataForDaschboardChartsDto>> GetDataOfChart(Guid dashboardChartId)
        {
            ResourceGroup resultResourceGroup = null;

            DataForDaschboardChartsDto dataForChart = new();
            var chart = await _dashboardRepository.GetFirstOrDefaultAsync(a => a.DashboardChartId == dashboardChartId);

            if (chart.SourceType == Domain.Enums.SourceType.ResourceGroup)
            {
                resultResourceGroup = await _resourceGroupRepository.GetDataForGroupChart(chart.SourceId);

                if (resultResourceGroup == null && dataForChart.SnapshotsDto.Count() == 0) return Result.Fail<DataForDaschboardChartsDto>("ta neco se dojebalo");

                if (chart.ChartType == Domain.Enums.ChartType.Pie)
                {
                    foreach (var resource in resultResourceGroup.Resources)
                    {
                        dataForChart.ResourcesDto.Add(_mapper.Map<ResourceDto>(resource));
                    }
                }
                if (chart.ChartType == Domain.Enums.ChartType.Line)
                {
                    dataForChart.SnapshotsDto = AggregateSnapshots(resultResourceGroup);
                }
            }

            else if (chart.SourceType == Domain.Enums.SourceType.Resource)
            {
                var result = await _snapshotService.GetAllMovesOfResourceAsync(chart.SourceId);
                if (result.IsSuccess) dataForChart.SnapshotsDto = result.Value.ToList();
            }

            return Result.Ok(dataForChart);
        }

        private List<SnapshotDto> AggregateSnapshots(ResourceGroup resultResourceGroup)
        {
            List<SnapshotDto> snapshots = new List<SnapshotDto>();
            var resouceCount = 0;
            foreach (var resource in resultResourceGroup.Resources)
            {
                resource.Snapshots = resource.Snapshots.OrderByDescending(a => a.DateOfChange).ToList();
                for (int snapshotIndex = 0; snapshotIndex < resource.Snapshots.Count(); snapshotIndex++)
                {
                    if (resouceCount == 0)
                    {
                        snapshots.Add(_mapper.Map<SnapshotDto>(resource.Snapshots.ElementAt(snapshotIndex)));
                    }
                    else
                    {
                        snapshots.ElementAt(snapshotIndex).Amount += resource.Snapshots.ElementAt(snapshotIndex).Amount;
                    }

                }
                resouceCount++;
            }
            return snapshots;
        }
    }
}

