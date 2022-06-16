using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.User
{
    public interface IUserRepository : IRepository<Entities.AppUser>
    {
        Result<AppUser> UpdateAccountId(Guid userId, Guid accountId);
        void Update(Entities.AppUser user);
        void SaveChanges();
    }
}
