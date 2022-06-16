using FinBoard.Domain.Repositories.Account;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Services.Services.AccountService;
using FinBoard.Services.Services.AuthServices;
using FinBoard.Utils.PersistenceService;
using FinBoard.Services.Services.ResourceService;
using FinBoard.Services.Services.TokenService;
using FinBoard.Services.Services.UserService;
using FinBoard.Services.Services.Move;
using FinBoard.Domain.Repositories.Move;
using FinBoard.Domain.Repositories.User;

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
            services.AddScoped<IMoveService, MoveService>();

            services.AddScoped<IMoveRepository, MoveRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IResourceRepository, ResourceRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
