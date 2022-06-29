using API.Controllers.Base;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Mvc;
using FinBoard.Services.Services.UserService;
using System.Reflection;
using FinBoard.Utils.PersistenceService;

namespace API.Controllers
{
    public class AuthController : BaseController
    {

        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;


        public AuthController(ILogger<AuthController> logger, IAuthService authService,
            IUserService userService, IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync(CreateUserDto registerDto)
        {
            var requestId = this.GetRequestId();
            //_logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));

            var existedUser = await _userService.GetUserByEmailAsync(registerDto.Email, requestId);

            if (existedUser.IsSuccess)
            {
                return BadRequest("User with given email is already existing.");
            }

            var userDto = await _authService.RegisterNewUserAsync(registerDto);

            if (userDto.IsSuccess)
            {
                return Ok(userDto.Value);
            }

            return BadRequest(userDto.Error);
        }


        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync(CreateUserDto loginUser)
        {
            var requestId = this.GetRequestId();
            //_logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));

            var existedUser = await _userService.GetUserByEmailAsync(loginUser.Email, requestId);

            if (existedUser.IsFailure)
            {
                return Unauthorized("User with given name not exist.");
            }

            var result = await _authService.CheckPassAndLogIn(loginUser);


            if (!result.IsSuccess)
            { return Unauthorized(); }


            return Ok(result.Value);
        }
    }
}
