using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FinBoard.Domain.Entities
{
    public class User : IdentityUser<Guid>, IBaseEntity
    {
        public string UserName { get; set; }
        public string CreatedBy { get ; set; }
        public string LastModifyBy { get; set; }
        public DateTime DateOfCreation { get; set; }
        public DateTime DateOfLastModification { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
