using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Analytics
{
    public class AnalyticsTileDto
    {
        public Guid SourceId { get; set; }
        public string Name { get; set; }
        public string EntityType { get; set; }
        public float CurrentValue { get; set; }
        public List<GrowthPeriodDto> QuarterlyGrowth { get; set; } = new();
        public List<GrowthPeriodDto> YearlyGrowth { get; set; } = new();
        public int OrderIndex { get; set; }
    }

    public class GrowthPeriodDto
    {
        public string Label { get; set; }
        public float? Growth { get; set; }
    }
}
