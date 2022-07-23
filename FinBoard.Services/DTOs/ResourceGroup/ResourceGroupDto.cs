using FinBoard.Services.DTOs.Resource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.ResourceGroup
{
    public class ResourceGroupDto
    {
        public Guid ResourceGroupId { get; set; }
        public Guid AccountId { get; set; }
        public string ResourceGroupName { get; set; }
        public virtual List<ResourceDto> Resources { get; set; }
    }
}
