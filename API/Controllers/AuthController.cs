using API.Controllers.Base;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Mvc;
using FinBoard.Services.Services.UserService;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {

        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;


        public AuthController(ILogger<AuthController> logger, IAuthService authService, IUserService userService)
        {
            _logger = logger;
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync(UserAuthDto registerDto)
        {
            //ToDo: Add some logging
            var requestId = this.GetRequestId();

            var existedUser = await _userService.GetUserByNameAsync(registerDto.UserName, requestId);
            
            if(existedUser.IsSuccess)
            {
                return BadRequest("User with given name is already existing.");
            }

            var userDto  = await _authService.RegisterNewUserAsync(registerDto);

            if(userDto.IsSuccess)
            {
                return Ok(userDto.Value);
            }

            return BadRequest("Oops something went really wrong");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync(UserAuthDto loginUser)
        {
            //ToDo: Add some logging
            var requestId = this.GetRequestId();

            var existedUser = await _userService.GetUserByNameAsync(loginUser.UserName, requestId);

            if (existedUser.IsFailure)
            {
                return Unauthorized("User with given name not exist.");
            }
            
            var result = await _authService.CheckPassAndLogIn(loginUser);


            if (!result.IsSuccess) { return Unauthorized(); }


            return Ok(result.Value);
        }
    }
}
