using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.User
{
    public class ResourceRepository : Repository<Entities.Resource>, IResourceRepository
    {
        private readonly DataContext _db;

        public ResourceRepository(DataContext db) : base(db)
        {
            _db = db;
        }
        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Update(Entities.Resource user)
        {
            var objFromDb = _db.Users.FirstOrDefault(a => a.Id == user.ResourceId);
        }
    }
}
