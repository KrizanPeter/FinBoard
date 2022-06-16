using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace FinBoard.Domain.Entities
{
    public class AppUser : IdentityUser<Guid>, IBaseEntity
    {
        public Guid? AccountId { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid LastModifyBy { get; set; }
        public DateTime DateOfCreation { get; set; }
        public DateTime DateOfLastModification { get; set; }
        public virtual ICollection<AppUserRole>? AppUserRoles { get; set; }
        public virtual Account? Account { get; set; }
    }
}
