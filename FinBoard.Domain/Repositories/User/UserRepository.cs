using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.PersistenceService;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.User
{
    public class UserRepository : Repository<Entities.AppUser>, IUserRepository
    {
        private readonly DataContext _db;

        public UserRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }
        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Update(Entities.AppUser user)
        {
            var objFromDb = _db.Users.FirstOrDefault(a => a.Id == user.Id);
        }

        public Result<Entities.AppUser> UpdateAccountId(Guid userId, Guid accountId)
        {
            var user = _db.Users.First(a => a.Id == userId);

            if (user != null)
            {
                user.AccountId = accountId;
                _db.SaveChanges();
                return Result.Ok(user);
            }
            return Result.Fail<Entities.AppUser>("user was not found");
        }
    }
}
