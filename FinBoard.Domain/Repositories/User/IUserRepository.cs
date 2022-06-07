using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.User
{
    public interface IUserRepository: IRepository<Entities.AppUser>
    {
        void Update(Entities.AppUser user);
        void SaveChanges();
    }
}
