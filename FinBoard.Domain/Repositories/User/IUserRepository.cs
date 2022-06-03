using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.User
{
    public interface IUserRepository: IRepository<Entities.User>
    {
        void Update(Entities.User user);
        void SaveChanges();
    }
}
