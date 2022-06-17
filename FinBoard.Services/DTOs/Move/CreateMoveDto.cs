using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Move
{
    public class CreateMoveDto
    {
        public Guid ResourceId { get; set; }
        public float Amount { get; set; }
        public DateTime DateOfChange { get; set; }
    }
}
