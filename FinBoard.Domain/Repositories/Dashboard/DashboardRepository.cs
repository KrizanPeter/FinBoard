using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.PersistenceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Dashboard
{
    public class DashboardRepository : Repository<Entities.DashboardChart>, IDashboardRepository
    {
        private readonly DataContext _db;

        public DashboardRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }


    }
}
