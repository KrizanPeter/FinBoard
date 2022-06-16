using FinBoard.Utils.PersistenceService;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Utils.Attributes
{
    [AttributeUsage(AttributeTargets.All, Inherited = true, AllowMultiple = true)]

    public class UserPersistor : Attribute
    {
        public UserPersistor(IPersistentService persistentService, Guid userId, Guid accountId)
        {
            persistentService.SetupRequestProperties(userId, accountId);
        }
    }
}
