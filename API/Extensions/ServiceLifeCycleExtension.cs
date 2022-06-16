using FinBoard.Domain.Repositories.Account;
using FinBoard.Domain.Repositories.User;
using FinBoard.Services.Services.AccountService;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Utils.PersistenceService;
using FinBoard.Services.Services.ResourceService;
using FinBoard.Services.Services.TokenService;
using FinBoard.Services.Services.UserService;

namespace API.Extensions
{
    public static class ServiceLifeCycleExtension
    {
        public static IServiceCollection AddServiceLifeCycleExtension(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IResourceService, ResourceService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IPersistentService, PersistentService>();

            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IResourceRepository, ResourceRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
