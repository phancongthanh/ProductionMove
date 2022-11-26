using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.ValueObjects;
using ProductionMove.Infrastructure.Identity;
using ProductionMove.Infrastructure.Persistence;
using ProductionMove.Infrastructure.Persistence.Interceptors;
using ProductionMove.Infrastructure.Services;

namespace Microsoft.Extensions.DependencyInjection;
public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<EntitySaveChangesInterceptor>();

        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("ProductionMoveDb"));
        }
        else
        {
            /*
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                    builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            */
            services.AddDbContext<ApplicationDbContext>(
                options =>
                {
                    var connectionString = configuration.GetConnectionString("DbContextMySQL");
                    options.UseMySql(connectionString,
                        new MySqlServerVersion(new Version(8, 0, 31)),
                        builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                    );
                }
            );
        }

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<ITokenProvider, TokenProvider>();
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddAppIdentity(configuration);
        services.AddAppAuthentication(configuration);
        services.AddAppAuthorization();

        return services;
    }

    public static IServiceCollection AddAppIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddDefaultIdentity<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 5;
                options.Password.RequiredUniqueChars = 0;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        return services;
    }

    public static IServiceCollection AddAppAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            configuration.Bind("JwtSettings", options);
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;

            var key = Encoding.UTF8.GetBytes(configuration["JwtSettings:SecurityKey"] ?? "No key");
            options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(key);
        });

        return services;
    }

    public static IServiceCollection AddAppAuthorization(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            options.AddPolicy("RefreshToken",
                policy => policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("Kind", "RefreshToken"));

            options.AddPolicy(Schema.Role.AuthenticatedUser,
                policy => policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim(Schema.RoleType)
                .RequireClaim("Kind", "AccessToken"));

            options.AddPolicy(Schema.Role.Administrator,
                policy => policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("Kind", "AccessToken")
                //.RequireClaim(Schema.BuildingId)
                .RequireClaim(Schema.RoleType, Schema.Role.Company)
                .RequireRole(Schema.Role.Administrator));

            options.AddPolicy(Schema.Role.Factory,
                policy => policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("Kind", "AccessToken")
                .RequireClaim(Schema.BuildingId)
                .RequireClaim(Schema.RoleType, Schema.Role.Factory)
                .RequireRole(Schema.Role.Factory));

            options.AddPolicy(Schema.Role.Distributor,
                policy => policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("Kind", "AccessToken")
                .RequireClaim(Schema.BuildingId)
                .RequireClaim(Schema.RoleType, Schema.Role.Distributor)
                .RequireRole(Schema.Role.Distributor));

            options.AddPolicy(Schema.Role.ServiceCenter,
                policy => policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("Kind", "AccessToken")
                .RequireClaim(Schema.BuildingId)
                .RequireClaim(Schema.RoleType, Schema.Role.ServiceCenter)
                .RequireRole(Schema.Role.ServiceCenter));

            var defaultPolicy = options.GetPolicy(Schema.Role.AuthenticatedUser);
            if (defaultPolicy != null) options.DefaultPolicy = defaultPolicy;
        });

        return services;
    }
}
