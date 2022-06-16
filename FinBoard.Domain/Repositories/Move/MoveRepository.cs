using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Utils.PersistenceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Move
{
    public class MoveRepository : Repository<Entities.Move>, IMoveRepository
    {
        private readonly DataContext _db;

        public MoveRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
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
    }
}
