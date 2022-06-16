using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Utils.PersistenceService
{
    public class PersistentService : IPersistentService
    {
        private Guid _requestUserId = Guid.Empty;
        private Guid _accountId = Guid.Empty;
        public void SetupRequestProperties(Guid userId, Guid accountId)
        {
            _requestUserId = userId;
            _accountId = accountId;
        }

        public Guid GetUserIdForRequest()
        {
            return _requestUserId;
        }

        public Guid GetAccountIdForRequest()
        {
            return _accountId;
        }
    }
}
