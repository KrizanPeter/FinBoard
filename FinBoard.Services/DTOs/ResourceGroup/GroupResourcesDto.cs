using FinBoard.Services.DTOs.Resource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.ResourceGroup
{
    public class GroupResourcesDto
    {
        public Guid ResourceGroupId { get; set; }
        public List<ResourceForGroupDto> Resources { get; set; } = new List<ResourceForGroupDto>();
    }
}
