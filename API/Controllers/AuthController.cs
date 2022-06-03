using API.Controllers.Base;
using FinBoard.Services.AuthServices;
using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {

        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;

        public AuthController(ILogger<AuthController> logger, IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        [HttpPost(Name = "Register")]
        public async Task<IActionResult> RegisterUserAsync(UserRegisterDto registerDto)
        {
            //ToDo: Add some logging
            var requestId = this.GetRequestId();

            _authService.EnsureUserNotExist(registerDto.UserName, requestId)
                .OnSuccess()


            _authService.

           //
        }
    }
}
