using FinBoard.Domain.Entities;
using FinBoard.Domain.Enums;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Domain.Repositories.ResourceGroup;
using FinBoard.Services.DTOs.Analytics;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.AnalyticsService
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly ILogger<AnalyticsService> _logger;
        private readonly IResourceRepository _resourceRepository;
        private readonly IResourceGroupRepository _resourceGroupRepository;

        public AnalyticsService(
            ILogger<AnalyticsService> logger,
            IResourceRepository resourceRepository,
            IResourceGroupRepository resourceGroupRepository)
        {
            _logger = logger;
            _resourceRepository = resourceRepository;
            _resourceGroupRepository = resourceGroupRepository;
        }

        public async Task<Result<List<AnalyticsTileDto>>> GetAnalyticsTilesAsync(Guid accountId)
        {
            var resources = await _resourceRepository.GetAllWithSnapshotAsync(accountId);
            var resourceGroups = await _resourceGroupRepository.GetAllWithResourcesAndSnapshotsAsync(accountId);

            var tiles = new List<AnalyticsTileDto>();

            foreach (var resource in resources)
            {
                var points = resource.Snapshots?
                    .OrderBy(s => s.DateOfSnapshot)
                    .Select(s => new DataPoint(s.DateOfSnapshot, (float)(s.Amount ?? 0)))
                    .ToList() ?? new List<DataPoint>();

                var currentValue = points.Any() ? points.Last().Amount : 0f;

                tiles.Add(new AnalyticsTileDto
                {
                    SourceId = resource.ResourceId,
                    Name = resource.Name,
                    EntityType = "resource",
                    CurrentValue = currentValue,
                    QuarterlyGrowth = BuildQuarterlyGrowth(points),
                    YearlyGrowth = BuildYearlyGrowth(points),
                    OrderIndex = resource.AnalyticsOrderIndex,
                });
            }

            foreach (var group in resourceGroups)
            {
                var points = AggregateGroupDataPoints(group);

                var currentValue = points.Any() ? points.Last().Amount : 0f;

                tiles.Add(new AnalyticsTileDto
                {
                    SourceId = group.ResourceGroupId,
                    Name = group.ResourceGroupName,
                    EntityType = "group",
                    CurrentValue = currentValue,
                    QuarterlyGrowth = BuildQuarterlyGrowth(points),
                    YearlyGrowth = BuildYearlyGrowth(points),
                    OrderIndex = group.AnalyticsOrderIndex,
                });
            }

            tiles = tiles.OrderBy(t => t.OrderIndex).ToList();

            return Result.Ok(tiles);
        }

        public async Task<Result> ReorderTilesAsync(List<ReorderAnalyticsTileDto> reorderList, Guid accountId)
        {
            var resources = await _resourceRepository.GetAllWithSnapshotAsync(accountId);
            var resourceGroups = await _resourceGroupRepository.GetAllWithResourceAsync(accountId);

            var resourceDict = resources.ToDictionary(r => r.ResourceId);
            var groupDict = resourceGroups.ToDictionary(g => g.ResourceGroupId);

            foreach (var item in reorderList)
            {
                if (item.SourceType == (int)SourceType.Resource && resourceDict.TryGetValue(item.SourceId, out var res))
                {
                    res.AnalyticsOrderIndex = item.OrderIndex;
                }
                else if (item.SourceType == (int)SourceType.ResourceGroup && groupDict.TryGetValue(item.SourceId, out var grp))
                {
                    grp.AnalyticsOrderIndex = item.OrderIndex;
                }
            }

            try
            {
                _resourceRepository.SaveChanges();
                _resourceGroupRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        private List<GrowthPeriodDto> BuildQuarterlyGrowth(List<DataPoint> points)
        {
            if (!points.Any()) return new List<GrowthPeriodDto>();

            var grouped = points
                .GroupBy(p => (p.Date.Year, Quarter: (p.Date.Month - 1) / 3 + 1))
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Quarter);

            float? previousEnd = null;
            var result = new List<GrowthPeriodDto>();

            foreach (var g in grouped)
            {
                var first = previousEnd ?? g.First().Amount;
                var last = g.Last().Amount;

                result.Add(new GrowthPeriodDto
                {
                    Label = $"{g.Key.Year} · Q{g.Key.Quarter}",
                    Growth = first == 0 ? null : ((last - first) / Math.Abs(first)) * 100,
                });

                previousEnd = last;
            }

            return result;
        }

        private List<GrowthPeriodDto> BuildYearlyGrowth(List<DataPoint> points)
        {
            if (!points.Any()) return new List<GrowthPeriodDto>();

            var grouped = points
                .GroupBy(p => p.Date.Year)
                .OrderBy(g => g.Key);

            float? previousEnd = null;
            var result = new List<GrowthPeriodDto>();

            foreach (var g in grouped)
            {
                var first = previousEnd ?? g.First().Amount;
                var last = g.Last().Amount;

                result.Add(new GrowthPeriodDto
                {
                    Label = g.Key.ToString(),
                    Growth = first == 0 ? null : ((last - first) / Math.Abs(first)) * 100,
                });

                previousEnd = last;
            }

            return result;
        }

        private List<DataPoint> AggregateGroupDataPoints(ResourceGroup group)
        {
            var dateMap = new SortedDictionary<DateTime, float>();

            if (group.Resources == null) return new List<DataPoint>();

            foreach (var resource in group.Resources)
            {
                if (resource.Snapshots == null) continue;
                foreach (var snap in resource.Snapshots)
                {
                    var date = snap.DateOfSnapshot.Date;
                    if (!dateMap.ContainsKey(date))
                        dateMap[date] = 0;
                    dateMap[date] += (float)(snap.Amount ?? 0);
                }
            }

            return dateMap.Select(kv => new DataPoint(kv.Key, kv.Value)).ToList();
        }

        private record DataPoint(DateTime Date, float Amount);
    }
}
