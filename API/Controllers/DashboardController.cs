using API.Controllers.Base;
using FinBoard.Services.DTOs.DashBoardChart;
using FinBoard.Services.DTOs.Resource;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.Services.DashboardService;
using FinBoard.Services.Services.ResourceService;
using FinBoard.Services.Services.UserService;
using FinBoard.Utils.Attributes;
using FinBoard.Utils.PersistenceService;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Reflection;

namespace API.Controllers
{
    public class DashboardController : BaseController
    {
        private readonly ILogger<DashboardController> _logger;
        private readonly IAuthService _authService;
        private readonly IDashboardService _dashboardService;
        private readonly IPersistentService _persistentService;


        public DashboardController(ILogger<DashboardController> logger, IAuthService authService,
            IUserService userService, IDashboardService dashboardService, IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _authService = authService;
            _dashboardService = dashboardService;
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

            var result = await _dashboardService.GetAllDashboardChartsAsync(accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }


        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateDashboardChartDto dashboardChartDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);


            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _dashboardService.CreateDashboardChartAsync(dashboardChartDto, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }
    }
}
