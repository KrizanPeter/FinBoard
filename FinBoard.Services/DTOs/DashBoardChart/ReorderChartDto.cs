using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.DashBoardChart
{
    public class ReorderChartDto
    {
        public Guid DashboardChartId { get; set; }
        public int OrderIndex { get; set; }
    }
}
