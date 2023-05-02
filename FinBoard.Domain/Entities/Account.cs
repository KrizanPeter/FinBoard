using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class Account : BaseEntity
    {
        public Guid AccountId { get; set; }
        public Guid AppUserId { get; set; }
        public DateTime? DateOfFirstSnapshot { get; set; }
        public int PeriodicityOfSnapshotsInDays { get; set; }

        [JsonIgnore]
        public IEnumerable<Resource>? Resources { get; set; }
        [JsonIgnore]
        public IEnumerable<DashboardChart> DashboardCharts { get; set; }
        [JsonIgnore]
        public virtual AppUser AppUser { get; set; }

    }
}
