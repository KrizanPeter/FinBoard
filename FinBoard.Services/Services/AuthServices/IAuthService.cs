using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.AuthServices
{
    public interface IAuthService
    {
        Task<Result<UserDto>> RegisterNewUserAsync(CreateUserDto registerDto);
        Task<Result<UserDto>> CheckPassAndLogIn(CreateUserDto loginUser);
    }
}
