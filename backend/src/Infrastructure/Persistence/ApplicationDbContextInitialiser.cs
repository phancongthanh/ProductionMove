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

        foreach (var role in roles)
        {
            if (_roleManager.Roles.All(r => r.Name != role.Name))
            {
                await _roleManager.CreateAsync(role);
            }
        }

        // Default users
        var administrator = new ApplicationUser
        {
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
        await TrySeedBuildingAsync();
        await TrySeedUserAsync();
    }

    public async Task TrySeedProductLineAsync()
    {
        if (!_context.ProductLines.Any())
        {
            _context.ProductLines.AddRange(new[]
            {
                new ProductLine()
                {
                    Id = "iPhone-11-64GB",
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
                    Id = "iPhone-13-mini-512GB",
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
                    Id = "iPhone-14-Pro Max-128GB",
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
    public async Task TrySeedBuildingAsync()
    {
        if (!_context.Factories.Any())
        {
            _context.Factories.AddRange(new[]
            {
                new Factory()
                {
                    Id = "Factory-1",
                    Name = "Cơ sở sản xuất X",
                    Address = "Số A, Đường B, Phường C, Quận E, Thành phố F"
                },
                new Factory()
                {
                    Id = "Factory-2",
                    Name = "Cơ sở sản xuất Y",
                    Address = "Số G, Đường H, Phường I, Quận J, Thành phố K"
                },
                new Factory()
                {
                    Id = "Factory-3",
                    Name = "Cơ sở sản xuất Z",
                    Address = "Số L, Đường M, Phường N, Quận O, Thành phố P"
                },
            });

            await _context.SaveChangesAsync();
        }
        if (!_context.Distributors.Any())
        {
            _context.Distributors.AddRange(new[]
            {
                new Distributor()
                {
                    Id = "Distributor-4",
                    Name = "Đại lý phân phối X",
                    Address = "Thôn A, Xã B, Huyện B, Thành phố C"
                },
                new Distributor()
                {
                    Id = "Distributor-5",
                    Name = "Đại lý phân phối Y",
                    Address = "Thôn D, Xã E, Huyện F, Thành phố G"
                },
                new Distributor()
                {
                    Id = "Distributor-6",
                    Name = "Đại lý phân phối Z",
                    Address = "Thôn H, Xã I, Huyện J, Thành phố K"
                },
            });

            await _context.SaveChangesAsync();
        }
        if (!_context.ServiceCenters.Any())
        {
            _context.ServiceCenters.AddRange(new[]
            {
                new ServiceCenter()
                {
                    Id = "ServiceCenter-7",
                    Name = "Trung tâm bảo hành X",
                    Address = "Thôn A, Xã B, Huyện B, Thành phố C"
                },
                new ServiceCenter()
                {
                    Id = "ServiceCenter-8",
                    Name = "Trung tâm bảo hành Y",
                    Address = "Thôn D, Xã E, Huyện F, Thành phố G"
                }
            });

            await _context.SaveChangesAsync();
        }
    }

    public async Task TrySeedUserAsync()
    {
        if (!_userManager.Users.Any(u => u.Role != RoleSchema.Administrator))
        {
            var factories = await _context.Factories.ToListAsync();
            for (int i = 0; i < factories.Count; i++)
                await _userManager.CreateAsync(
                    new ApplicationUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Nhân viên của " + factories[i].Name,
                        UserName = "Factory" + i,
                        Role = RoleSchema.Factory,
                        BuildingId = factories[i].Id,
                        PhoneNumber = "09" + (Guid.NewGuid().GetHashCode() % 10e8),
                        Email = "FactoryUser" + i + "@BigCorp.com"
                    },
                    "FactoryUser" + i + "@BigCorp.com"
                );
            var distributers = await _context.Distributors.ToListAsync();
            for (int i = 0; i < distributers.Count; i++)
                await _userManager.CreateAsync(
                    new ApplicationUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Nhân viên của " + distributers[i].Name,
                        UserName = "Distributer" + i,
                        Role = RoleSchema.Distributor,
                        BuildingId = distributers[i].Id,
                        PhoneNumber = "09" + (Guid.NewGuid().GetHashCode() % 10e8),
                        Email = "DistributerUser" + i + "@BigCorp.com"
                    },
                    "DistributerUser" + i + "@BigCorp.com"
                );
            var serviceCenters = await _context.ServiceCenters.ToListAsync();
            for (int i = 0; i < serviceCenters.Count; i++)
                await _userManager.CreateAsync(
                    new ApplicationUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "Nhân viên của " + serviceCenters[i].Name,
                        UserName = "ServiceCenter" + i,
                        Role = RoleSchema.ServiceCenter,
                        BuildingId = serviceCenters[i].Id,
                        PhoneNumber = "09" + (Guid.NewGuid().GetHashCode() % 10e8),
                        Email = "ServiceCenterUser" + i + "@BigCorp.com"
                    },
                    "ServiceCenterUser" + i + "@BigCorp.com"
                );
        }
    }
}
