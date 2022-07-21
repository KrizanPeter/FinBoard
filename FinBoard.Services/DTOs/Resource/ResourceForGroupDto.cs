using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Resource
{
    public class ResourceForGroupDto
    {
        public Guid ResourceId { get; set; }
        public string Name { get; set; }
        public bool IsInGroup { get; set; }

    }
}
