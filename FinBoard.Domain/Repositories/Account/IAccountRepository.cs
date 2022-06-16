using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Account
{
    public interface IAccountRepository : IRepository<Entities.Account>
    {
        void Update(Entities.Account account);
        void SaveChanges();
    }
}
