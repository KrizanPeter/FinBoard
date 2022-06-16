using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Move
{
    public interface IMoveRepository : IRepository<Entities.Move>
    {
        void Update(Entities.Resource user);
        void SaveChanges();
    }
}
