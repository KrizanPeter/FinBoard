using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.AuthServices
{
    public interface IAuthService
    {
        Result EnsureUserNotExist(string userName, Guid requestId);
    }
}
