using FinBoard.Domain.Entities.Base;
using FinBoard.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class DashboardChart : BaseEntity
    {
        public Guid DashboardChartId { get; set; }
        public Guid AccountId { get; set; }
        public Guid SourceId { get; set; }
        public SourceType SourceType { get; set; }
        public ChartType ChartType { get; set; }
    }
}
