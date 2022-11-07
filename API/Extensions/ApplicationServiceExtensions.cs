using System;
using FinBoard.Domain.Context;
using FinBoard.Services.Mapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

            services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                string connStr;

                if (env == "DevelopmentMsql")
                {
                    connStr = config.GetConnectionString("DefaultConnection");
                    options.UseSqlServer(connStr);
                }
                else
                {
                    if (env == "Development")
                    {
                        //postgres:postgrespw
                        // connStr = "Server=localhost;Port=49153;User Id=postgres;Password=postgrespw;Database=Finboard";
                        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                        // Parse connection URL to connection string for Npgsql
                        connUrl = connUrl.Replace("postgres://", string.Empty);

                        var pgDb = Environment.GetEnvironmentVariable("PGDATABASE");
                        var pgUser = Environment.GetEnvironmentVariable("PGUSER");
                        var pgPass = Environment.GetEnvironmentVariable("PGPASSWORD");
                        var pgHost = Environment.GetEnvironmentVariable("PGHOST");
                        var pgPort = Environment.GetEnvironmentVariable("PGPORT");

                        connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;TrustServerCertificate=True";
                        Console.WriteLine(connStr);
                    }
                    else
                    {
                        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                        // Parse connection URL to connection string for Npgsql
                        connUrl = connUrl.Replace("postgres://", string.Empty);
                        var pgUserPass = connUrl.Split("@")[0];
                        var pgHostPortDb = connUrl.Split("@")[1];
                        var pgHostPort = pgHostPortDb.Split("/")[0];
                        var pgDb = pgHostPortDb.Split("/")[1];
                        var pgUser = pgUserPass.Split(":")[0];
                        var pgPass = pgUserPass.Split(":")[1];
                        var pgHost = pgHostPort.Split(":")[0];
                        var pgPort = pgHostPort.Split(":")[1];

                        connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;TrustServerCertificate=True";
                    }
                    options.UseNpgsql(connStr);
                }
            });

            return services;
        }
    }
}
