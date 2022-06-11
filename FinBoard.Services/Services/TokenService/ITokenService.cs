using FinBoard.Domain.Entities;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.TokenService
{
    public interface ITokenService
    {
        string GetToken(AppUser user);
    }
}
