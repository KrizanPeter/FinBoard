using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class Snapshot : BaseEntity
    {
        public Guid SnapshotId { get; set; }
        public Guid ResourceId { get; set; }
        public float Amount { get; set; }
        public DateTime DateOfChange { get; set; }
    }
}
