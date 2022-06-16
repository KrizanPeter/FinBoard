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
    [ApiController]
    [Route("api/[controller]")]
    public class MoveController
    {
    }
}
