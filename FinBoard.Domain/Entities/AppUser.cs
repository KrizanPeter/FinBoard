using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class AppUser
    {
        public Guid AppUserId { get; set; }
        public string UserName { get; set; }

    }
}
