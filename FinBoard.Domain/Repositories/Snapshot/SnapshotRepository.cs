using FinBoard.Domain.Context;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.PersistenceService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Move
{
    public class SnapshotRepository : Repository<Entities.Snapshot>, ISnapshotRepository
    {
        private readonly DataContext _db;

        public SnapshotRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Update(Entities.Resource user)
        {
            throw new NotImplementedException();
        }

        public List<Snapshot> GetAllAccountSnapshots(Guid accountId)
        {
            var snapshots = _db.Snapshots
                .Where(a => a.AccountId == accountId)
                .OrderBy(a => a.DateOfCreation)
                .ToList();

            return snapshots;
        }
    }
}
