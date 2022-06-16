using FinBoard.Domain.Entities;
using FinBoard.Services.DTOs.User;
using FinBoard.Services.Services.UserService;
using FinBoard.Utils.PersistenceService;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Security.Claims;

namespace API.Controllers.Base
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        protected readonly IUserService _userService;
        protected Guid requestId { get; set; }


        public BaseController(IUserService userService)
        {
            _userService = userService;
        }

        protected Guid GetRequestId()
        {
            requestId = Guid.NewGuid();
            return requestId;
        }
        protected Result<Guid> GetCurrentUserAccountId()
        {
            var result = _userService.GetUserByNameAsync(User.FindFirstValue(ClaimTypes.NameIdentifier), requestId).Result;
            if (result.Value != null)
            {
                return Result.Ok(result.Value.AccountId);
            }
            return Result.Ok(Guid.Empty);
        }

        protected Result<Guid> GetCurrentUserId()
        {
            var result = GetCurrentUser();
            if (result.IsSuccess)
                return Result.Ok(result.Value.Id);
            return Result.Ok(Guid.Empty);
        }

        protected Result<UserDto> GetCurrentUser()
        {
            if (User == null)
                return Result.Fail<UserDto>("No user loged in....");

            var result = _userService.GetUserByNameAsync(User.FindFirstValue(ClaimTypes.NameIdentifier), requestId).Result;
            if (result.Value != null)
                return result;
            return Result.Fail<UserDto>("User was not found");
        }
        protected string LogApiAccess(Guid requestId, MethodBase methodBase)
        {
            var result = GetCurrentUser();
            if (result.IsSuccess)
            {
                return GetLogMsgForUser(result.Value.Id, methodBase.Name, requestId).Value;
            }

            return String.Format("Method: {0}; Datetime: {1}; RequestId: {2}", methodBase.Name, DateTime.Now, requestId);
        }

        private Result<string> GetLogMsgForUser(Guid userId, string methodName, Guid requestId)
        {
            return Result.Ok(String.Format("User: {0}; Method: {1}; Datetime: {2}; RequestId: {3}", userId, methodName, DateTime.Now, requestId));
        }
    }
}
