using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Utils.PersistenceService
{
    public interface IPersistentService
    {
        void SetupRequestProperties(Guid userId, Guid accountId);
        Guid GetUserIdForRequest();
        Guid GetAccountIdForRequest();

    }
}
