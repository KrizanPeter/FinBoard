using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities.Base
{
    public interface IBaseEntity
    {
        public Guid CreatedBy { get; set; }
        public Guid LastModifyBy { get; set; }
        public DateTime DateOfCreation { get; set; }
        public DateTime DateOfLastModification { get; set; }
    }
}
