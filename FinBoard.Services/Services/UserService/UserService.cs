using AutoMapper;
using FinBoard.Domain.Repositories.User;
using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(ILogger<UserService> logger, IUserRepository userRepository, IMapper mapper)
        {
            _logger = logger;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<Result<UserDto>> GetUserByEmailAsync(string email, Guid requestId)
        {
            //Add some log
            if (string.IsNullOrEmpty(email))
            {
                return Result.Fail<UserDto>("Current user not found");
            }
            var result = await _userRepository.GetFirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower());
            if (result != null)
            {
                var userDto = _mapper.Map<UserDto>(result);
                return Result.Ok(userDto);
            }
            return Result.Fail<UserDto>("User not found");
        }

        public async Task<Result<UserDto>> GetUserByNameAsync(string userName, Guid requestId)
        {
            //Add some log
            if (string.IsNullOrEmpty(userName))
            {
                return Result.Fail<UserDto>("Current user not found");
            }
            var result = await _userRepository.GetFirstOrDefaultAsync(a => a.UserName.ToLower() == userName.ToLower());
            if (result != null)
            {
                var userDto = _mapper.Map<UserDto>(result);
                return Result.Ok(userDto);
            }
            return Result.Fail<UserDto>("User not found");
        }

    }
}
