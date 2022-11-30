using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;
using ProductionMove.Infrastructure.Identity;

namespace ProductionMove.Infrastructure.Persistence;
public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsSqlServer())
            {
                await _context.Database.MigrateAsync();
            }
            else if (_context.Database.IsMySql())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default roles
        var roles = new[]
        {
            new IdentityRole(RoleSchema.Administrator),
            new IdentityRole(RoleSchema.Factory),
            new IdentityRole(RoleSchema.Distributor),
            new IdentityRole(RoleSchema.ServiceCenter)
        };

        foreach (var role in roles) {
            if (_roleManager.Roles.All(r => r.Name != role.Name))
            {
                await _roleManager.CreateAsync(role);
            }
        }

        // Default users
        var administrator = new ApplicationUser {
            UserName = "admin",
            Name = "Admin",
            Email = "administrator@localhost",
            Role = Schema.Role.Company
        };

        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "admin");
            await _userManager.AddToRoleAsync(administrator, RoleSchema.Administrator);
        }

        await TrySeedProductLineAsync();

        // Default data
        // Seed, if necessary
        /*
        if (!_context.TodoLists.Any())
        {
            _context.TodoLists.Add(new TodoList
            {
                Title = "Todo List",
                Items =
                {
                    new TodoItem { Title = "Make a todo list 📃" },
                    new TodoItem { Title = "Check off the first item ✅" },
                    new TodoItem { Title = "Realise you've already done two things on the list! 🤯"},
                    new TodoItem { Title = "Reward yourself with a nice, long nap 🏆" },
                }
            });

            await _context.SaveChangesAsync();
        }
        */
    }

    public async Task TrySeedProductLineAsync()
    {
        if (!_context.ProductLines.Any())
        {
            _context.ProductLines.AddRange(new[]
            {
                new ProductLine()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "iPhone 11 64GB",
                    WarrantyPeriod = 2*12,
                    Describes = new []
                    {
                        new ProductLineInfo() { Property = "Màu", Value = "Trắng"},
                        new ProductLineInfo() { Property = "CPU", Value = "Apple A13 Bionic 6 nhân"},
                        new ProductLineInfo() { Property = "Ram", Value = "4 GB"},
                        new ProductLineInfo() { Property = "Dung lượng lưu trữ", Value = "64 GB"},
                        new ProductLineInfo() { Property = "Dung lượng pin", Value = "3110 mAh"}
                    }
                },
                new ProductLine()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "iPhone 13 mini 512GB",
                    WarrantyPeriod = 2*12,
                    Describes = new []
                    {
                        new ProductLineInfo() { Property = "Màu", Value = "Đỏ"},
                        new ProductLineInfo() { Property = "CPU", Value = "Apple A15 Bionic 6 nhân"},
                        new ProductLineInfo() { Property = "Ram", Value = "4 GB"},
                        new ProductLineInfo() { Property = "Dung lượng lưu trữ", Value = "512 GB"},
                        new ProductLineInfo() { Property = "Dung lượng pin", Value = "2438 mAh"}
                    }
                },
                new ProductLine()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "iPhone 14 Pro Max 128GB",
                    WarrantyPeriod = 2*12,
                    Describes = new []
                    {
                        new ProductLineInfo() { Property = "CPU", Value = "Apple A16 Bionic 6 nhân"},
                        new ProductLineInfo() { Property = "Ram", Value = "6 GB"},
                        new ProductLineInfo() { Property = "Dung lượng lưu trữ", Value = "128 GB"},
                        new ProductLineInfo() { Property = "Dung lượng pin", Value = "4323 mAh"}
                    }
                }
            });

            await _context.SaveChangesAsync();
        }
    }
}
