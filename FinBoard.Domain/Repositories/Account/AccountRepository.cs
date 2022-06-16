using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.PersistenceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Account
{
    public class AccountRepository : Repository<Entities.Account>, IAccountRepository
    {
        private readonly DataContext _db;

        public AccountRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }
        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Update(Entities.Account account)
        {
            var objFromDb = _db.Users.FirstOrDefault(a => a.Id == account.AccountId);
        }
    }
}
