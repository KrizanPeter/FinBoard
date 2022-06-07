using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class AppUserRole : IdentityUserRole<Guid>
    {
        public virtual AppUser AppUser { get; set; }

        public virtual AppRole AppRole { get; set; }

    }
}
