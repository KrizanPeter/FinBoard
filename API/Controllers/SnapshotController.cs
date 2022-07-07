using API.Controllers.Base;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Services.DTOs.User;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Mvc;
using FinBoard.Services.Services.UserService;
using System.Reflection;
using FinBoard.Utils.PersistenceService;
using FinBoard.Services.Services.Move;
using FinBoard.Services.Services.ResourceService;
using FinBoard.Services.DTOs.Move;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class SnapshotController : BaseController
    {
        private readonly ILogger<SnapshotController> _logger;
        private readonly ISnapshotService _moveService;
        private readonly IResourceService _resourceService;
        private readonly IPersistentService _persistentService;


        public SnapshotController(ILogger<SnapshotController> logger, IUserService userService, ISnapshotService moveService,
            IPersistentService persistentService, IResourceService resourceService) : base(userService)
        {
            _resourceService = resourceService;
            _logger = logger;
            _moveService = moveService;
            _persistentService = persistentService;
        }


        [HttpGet("getAll")]
        [Authorize]
        public async Task<IActionResult> GetAll(Guid resourceId)
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

            var result = await _moveService.GetAllMovesOfResourceAsync(resourceId);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> Create(CreateSnapshotDto moveDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var validity = await _resourceService.CheckValidityAsync(moveDto.ResourceId, accountId.Value);

            if (validity.IsFailure)
            {
                return BadRequest(validity.Error);
            }

            var result = await _moveService.CreateMoveForResourceAsync(moveDto);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }

        [HttpPost("createAggregate")]
        [Authorize]
        public async Task<IActionResult> CreateAggregate(CreateSnapshotDto[] movesDto)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            foreach (var item in movesDto)
            {
                var validity = await _resourceService.CheckValidityAsync(item.ResourceId, accountId.Value);
                if (validity.IsFailure)
                {
                    return BadRequest(validity.Error);
                }
            }

            foreach (var item in movesDto)
            {
                var result = await _moveService.CreateMoveForResourceAsync(item);
                if (result.IsFailure) return BadRequest(result.Error);
            }
            return Ok();
        }


        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid snapshotId)
        {
            var requestId = this.GetRequestId();
            var accountId = GetCurrentUserAccountId();
            _logger.LogInformation(this.LogApiAccess(requestId, MethodBase.GetCurrentMethod()));
            _persistentService.SetupRequestProperties(GetCurrentUserId().Value, GetCurrentUserAccountId().Value);

            if (accountId.IsFailure) { return BadRequest(accountId.Error); }

            var validity = await _moveService.CheckValidityAsync(snapshotId, accountId.Value);

            if (validity.IsFailure)
            {
                return BadRequest(validity.Error);
            }

            var result = await _moveService.DeleteMoveAsync(snapshotId);

            if (result.IsSuccess)
            {
                return Ok();
            }

            return BadRequest(result.Error);
        }


    }
}
