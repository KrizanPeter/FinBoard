using FinBoard.Domain.Entities.Base;
using FinBoard.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class Resource : BaseEntity
    {
        public Guid ResourceId { get; set; }
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public Currency Currency { get; set; }
        public virtual ICollection<Snapshot> Snapshots { get; set; }
        public virtual ICollection<ResourceGroup> ResourceGroups { get; set; }

    }
}
