using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.ResourceGroup
{
    public interface IResourceGroupRepository : IRepository<Entities.ResourceGroup>
    {
        void Update(Entities.ResourceGroup user);
        void SaveChanges();
    }
}
