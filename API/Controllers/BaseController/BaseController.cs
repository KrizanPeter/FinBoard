using FinBoard.Domain.Entities;
using FinBoard.Services.DTOs.User;
using FinBoard.Services.Services.UserService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Security.Claims;

namespace API.Controllers.Base
{
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

        protected UserDto GetCurrentUser()
        {
            var result = _userService.GetUserByNameAsync(User.FindFirstValue(ClaimTypes.NameIdentifier), requestId).Result;
            return result.Value;
        }
        protected string LogApiAccess(Guid requestId, MethodBase methodBase)
        {
            var message = String.Format("User: {0}; Method: {1}; Datetime: {3}; RequestId: {4}", GetCurrentUser().Id, methodBase.Name, DateTime.Now, requestId);
            return message;
        }
    }
}
