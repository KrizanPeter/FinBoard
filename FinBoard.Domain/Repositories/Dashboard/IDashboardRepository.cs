using FinBoard.Domain.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Dashboard
{
    public interface IDashboardRepository : IRepository<Entities.DashboardChart>
    {
        void SaveChanges();
    }
}
