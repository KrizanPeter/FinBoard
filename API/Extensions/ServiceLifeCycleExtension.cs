using FinBoard.Domain.Repositories.User;
using FinBoard.Services.Services.AuthServices;
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


            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
