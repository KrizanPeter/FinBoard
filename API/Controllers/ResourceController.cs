using API.Controllers.Base;
using FinBoard.Services.DTOs.Resource;
using FinBoard.Services.Services.AuthServices;
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

    public class ResourceController : BaseController
    {

        private readonly ILogger<ResourceController> _logger;
        private readonly IAuthService _authService;
        private readonly IResourceService _resourceService;
        private readonly IPersistentService _persistentService;


        public ResourceController(ILogger<ResourceController> logger, IAuthService authService,
            IUserService userService, IResourceService resourceService, IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _authService = authService;
            _resourceService = resourceService;
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

            var result = await _resourceService.GetAllReourceOfAccountAsync(accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateResourceDto resourceDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);


            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _resourceService.CreateResourceAsync(resourceDto, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid resourceId)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var validity = await _resourceService.CheckValidityAsync(resourceId, accountId.Value);

            if (validity.IsFailure)
            {
                return BadRequest(validity.Error);
            }

            var result = await _resourceService.DeleteResourceAsync(resourceId);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }
    }
}
