using FinBoard.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.DashBoardChart
{
    public class CreateDashboardChartDto
    {
        public Guid DashboardChartId { get; set; }
        public Guid SourceId { get; set; }
        public string ChartName { get; set; }

        public SourceType SourceType { get; set; }
        public ChartType ChartType { get; set; }
    }
}
