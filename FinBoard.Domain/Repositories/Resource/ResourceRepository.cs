using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.PersistenceService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Resource
{
    public class ResourceRepository : Repository<Entities.Resource>, IResourceRepository
    {
        private readonly DataContext _db;

        public ResourceRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }

        public async Task<IEnumerable<Entities.Resource>> GetAllWithSnapshotAsync(Guid accountId)
        {
            var result = await _db.Resources
                .Where(a => a.AccountId == accountId)
                .Include(a => a.Snapshots.OrderBy(a => a.DateOfSnapshot))
                .ToListAsync();
            return result;
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
