using FinBoard.Services.DTOs.Move;
using FinBoard.Services.DTOs.Resource;
using FinBoard.Services.DTOs.ResourceGroup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.DashBoardChart
{
    public class DataForDaschboardChartsDto
    {
        public List<ResourceDto> ResourcesDto { get; set; } = new List<ResourceDto>(); //Group pie
        public List<SnapshotDto> SnapshotsDto { get; set; } = new List<SnapshotDto>(); //Resource line


    }
}
