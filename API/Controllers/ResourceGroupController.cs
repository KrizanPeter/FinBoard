using API.Controllers.Base;
using FinBoard.Services.DTOs.ResourceGroup;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.Services.ResourceGroupService;
using FinBoard.Services.Services.UserService;
using FinBoard.Utils.PersistenceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace API.Controllers
{
    public class ResourceGroupController : BaseController
    {
        private readonly ILogger<ResourceController> _logger;
        private readonly IAuthService _authService;
        private readonly IResourceGroupService _resourceGroupService;
        private readonly IPersistentService _persistentService;


        public ResourceGroupController(ILogger<ResourceController> logger, IAuthService authService,
            IUserService userService, IResourceGroupService resourceGroupService, IPersistentService persistentService) : base(userService)
        {
            _logger = logger;
            _authService = authService;
            _resourceGroupService = resourceGroupService;
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

            var result = await _resourceGroupService.GetAllReourceGroupsOfAccountAsync(accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateResourceGroupDto resourceGroupDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);


            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _resourceGroupService.CreateResourceGroupAsync(resourceGroupDto, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }


        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid resourceGroupId)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var validity = await _resourceGroupService.CheckValidityAsync(resourceGroupId, accountId.Value);

            if (validity.IsFailure)
            {
                return BadRequest(validity.Error);
            }

            var result = await _resourceGroupService.DeleteResourceGroupAsync(resourceGroupId);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpPut("addResource")]
        public async Task<IActionResult> AddResourceToGroupAsync(GroupResourcesDto addResourceToGroupDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var validity = await _resourceGroupService.CheckValidityAsync(addResourceToGroupDto.ResourceGroupId, accountId.Value);

            if (validity.IsFailure)
            {
                return BadRequest(validity.Error);
            }

            var result = await _resourceGroupService.AddResourcesToGroup(addResourceToGroupDto);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpGet("getGroupsResources")]
        public async Task<IActionResult> GetGroupsResources(Guid resourceGroupId)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var result = await _resourceGroupService.GetGroupsResourcesAsync(resourceGroupId, accountId.Value);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }


    }
}
