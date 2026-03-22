using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Analytics
{
    public class ReorderAnalyticsTileDto
    {
        public Guid SourceId { get; set; }
        public int SourceType { get; set; }
        public int OrderIndex { get; set; }
    }
}
