using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.UserService
{
    public interface IUserService
    {
        Task<Result<UserDto>> GetUserByNameAsync(string userName, Guid requestId);
    }
}
