using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.AuthServices
{
    public class AuthService : IAuthService
    {
        private readonly ILogger<AuthService> _logger;
        public AuthService(ILogger<AuthService> logger)
        {
            _logger = logger;
        }
    }
}
