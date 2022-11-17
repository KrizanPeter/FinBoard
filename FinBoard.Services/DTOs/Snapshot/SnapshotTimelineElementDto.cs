using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Snapshot
{
    public class SnapshotTimelineElementDto
    {
        public DateTime? Date { get; set; }
        public bool IsSuccess { get; set; }
        public string Tooltip { get { return ConstructTooltip(); } }
        public List<TimelineResourceDto> Resources { get; set; } = new List<TimelineResourceDto>();

        private string ConstructTooltip()
        {
            var msg = "Snapshot date: " + this.Date.Value.Date + " \n ";
            foreach (var resource in Resources)
            {
                msg = msg + resource.Name + (resource.IsSnapped ? ": Ok" : "Fail") + " \n ";
            }
            return msg;
        }
    }
}
