using FinBoard.Services.DTOs.Account;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.RestoreService
{
    public interface IRestoreService
    {
        Task<Result> RestoreDataForAccount(AccountBaseDataDto accountBaseDataDto);

    }
}
