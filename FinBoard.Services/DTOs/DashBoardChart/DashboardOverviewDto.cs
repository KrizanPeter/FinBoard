using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.DashBoardChart
{
    public class DashboardOverviewDto
    {
        public string Name { get; set; }
        public float Amount { get; set; }
        public float PercentageMove { get; set; }
        public bool? IsRising { get; set; }
        public string ResourceType { get; set; }
    }
}
