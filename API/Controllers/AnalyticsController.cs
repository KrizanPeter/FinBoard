using API.Controllers.Base;
using FinBoard.Services.DTOs.Analytics;
using FinBoard.Services.Services.AnalyticsService;
using FinBoard.Services.Services.UserService;
using FinBoard.Utils.PersistenceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace API.Controllers
{
    public class AnalyticsController : BaseController
    {
        private readonly ILogger<AnalyticsController> _logger;
        private readonly IAnalyticsService _analyticsService;
        private readonly IPersistentService _persistentService;

        public AnalyticsController(
            ILogger<AnalyticsController> logger,
            IUserService userService,
            IAnalyticsService analyticsService,
            IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _analyticsService = analyticsService;
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

            var result = await _analyticsService.GetAnalyticsTilesAsync(accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpPut("reorder")]
        public async Task<IActionResult> Reorder(List<ReorderAnalyticsTileDto> reorderList)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _analyticsService.ReorderTilesAsync(reorderList, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }
    }
}
