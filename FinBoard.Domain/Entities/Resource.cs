using FinBoard.Domain.Entities.Base;
using FinBoard.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class Resource : BaseEntity
    {
        public Guid ResourceId { get; set; }
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public Currency Currency { get; set; }

        [JsonIgnore]
        public virtual ICollection<Snapshot> Snapshots { get; set; }
        [JsonIgnore]
        public virtual ICollection<ResourceGroup> ResourceGroups { get; set; }

        [NotMapped]
        [JsonIgnore]
        public float Amount
        {
            get
            {
                if (Snapshots == null || Snapshots.Count == 0)
                    return 0;
                var value = Snapshots.OrderByDescending(a => a.DateOfSnapshot).First().Amount;
                if (value == null) return 0;
                return (float)value;
            }
            set { }
        }

    }
}
