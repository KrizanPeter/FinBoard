using API.Controllers.Base;
using FinBoard.Services.DTOs.Account;
using FinBoard.Services.Services.AccountService;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.Services.UserService;
using FinBoard.Utils.PersistenceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly ILogger<DashboardController> _logger;
        private readonly IAuthService _authService;
        private readonly IAccountService _accountService;
        private readonly IPersistentService _persistentService;


        public AccountController(ILogger<DashboardController> logger, IAuthService authService,
            IUserService userService, IAccountService accountService, IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _authService = authService;
            _accountService = accountService;
            _persistentService = persistentService;
        }

        [Authorize]
        [HttpGet("getBaseData")]
        public async Task<IActionResult> GetBaseAccountData()
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _accountService.GetBaseAccountData(accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }


        [Authorize]
        [HttpPut("setBaseData")]
        public async Task<IActionResult> SetBaseAccountData(AccountBaseDataDto accountBaseDataDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _accountService.SetBaseAccountData(accountId.Value, accountBaseDataDto);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }
    }
}
