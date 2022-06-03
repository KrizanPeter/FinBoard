﻿using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Base
{
    public class BaseController: ControllerBase
    {
        protected Guid GetRequestId()
        {
            return Guid.NewGuid();
        }

    }
}