using FinBoard.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.DownloadStructure
{
    public class DownloadStructureDto
    {
        public Domain.Entities.Account? Account { get; set; }
        public List<Domain.Entities.ResourceGroup> ResourceGroup { get; set; } = new List<Domain.Entities.ResourceGroup>(); 
        public List<Domain.Entities.Resource> Resource { get; set; } = new List<Domain.Entities.Resource>();
        public List<Domain.Entities.Snapshot> Snapshot { get; set; } = new List<Domain.Entities.Snapshot>();
    }
}
