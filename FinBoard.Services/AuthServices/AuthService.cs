using FinBoard.Domain.Repositories.User;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.AuthServices
{
    public class AuthService : IAuthService
    {
        private readonly ILogger<AuthService> _logger;
        private readonly IUserRepository _userRepository;
        public AuthService(ILogger<AuthService> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        public Result EnsureUserNotExist(string userName, Guid requestId)
        {
            //Add some log
            var result = _userRepository.GetFirstOrDefault(a => a.UserName.ToLower() == userName.ToLower());
            if (result == null)
            {
                return Result.Ok();
            } 
            return Result.Fail("User with name " + userName + " already exist");
        }
    }
}
