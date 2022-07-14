using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Utils.PersistenceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.ResourceGroup
{
    public class ResourceGroupRepository : Repository<Entities.ResourceGroup>, IResourceGroupRepository
    {
        private readonly DataContext _db;

        public ResourceGroupRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Update(Entities.ResourceGroup user)
        {
            throw new NotImplementedException();
        }
    }
}
