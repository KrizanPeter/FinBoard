using API.Controllers.Base;
using FinBoard.Services.DTOs.FinancialGoal;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.Services.FinancialGoalService;
using FinBoard.Services.Services.UserService;
using FinBoard.Utils.PersistenceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace API.Controllers
{
    public class FinancialGoalController : BaseController
    {
        private readonly ILogger<FinancialGoalController> _logger;
        private readonly IAuthService _authService;
        private readonly IFinancialGoalService _financialGoalService;
        private readonly IPersistentService _persistentService;

        public FinancialGoalController(ILogger<FinancialGoalController> logger, IAuthService authService,
            IUserService userService, IFinancialGoalService financialGoalService, IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _authService = authService;
            _financialGoalService = financialGoalService;
            _persistentService = persistentService;
        }

        [Authorize]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _financialGoalService.GetAllGoalsOfAccountAsync(accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateFinancialGoalDto goalDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _financialGoalService.CreateGoalAsync(goalDto, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update(UpdateFinancialGoalDto goalDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _financialGoalService.UpdateGoalAsync(goalDto, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid financialGoalId)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _financialGoalService.DeleteGoalAsync(financialGoalId, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }
    }
}
