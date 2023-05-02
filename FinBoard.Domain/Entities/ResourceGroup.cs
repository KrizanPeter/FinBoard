using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class ResourceGroup :BaseEntity
    {
        public Guid ResourceGroupId { get; set; }
        public Guid AccountId { get; set; }
        public string ResourceGroupName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Resource> Resources { get; set; }
    }
}
