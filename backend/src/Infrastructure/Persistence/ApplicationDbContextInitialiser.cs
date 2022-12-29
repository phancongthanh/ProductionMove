using System.Threading;
using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Enums;
using ProductionMove.Domain.ValueObjects;
using ProductionMove.Infrastructure.Identity;

namespace ProductionMove.Infrastructure.Persistence;
public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly Random _random;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
        _random = new Random(DateTime.Now.Millisecond);
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
            await TrySeedAdministratorAsync();

            await TrySeedProductLineAsync();
            await TrySeedBuildingAsync();
            await TrySeedUserAsync();
            await TrySeedProductAsync();
            await TrySeedDistributionAsync();
            await TrySeedSoldProductAsync();
            await TrySeedWarrantyAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAdministratorAsync()
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
    }

    protected async Task TrySeedProductLineAsync()
    {
        if (!_context.ProductLines.Any())
        {
            _context.ProductLines.AddRange(new[]
            {
                new ProductLine()
                {
                    Id = "iPhone-11-64GB",
                    Name = "iPhone 11 64GB",
                    WarrantyPeriod = 365,
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
                    WarrantyPeriod = 365,
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
                    WarrantyPeriod = 365,
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
    protected async Task TrySeedBuildingAsync()
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
                new Distributor()
                {
                    Id = "Distributor-7",
                    Name = "Đại lý phân phối A",
                    Address = "Thôn L, Xã M, Huyện N, Thành phố O"
                },
                new Distributor()
                {
                    Id = "Distributor-8",
                    Name = "Đại lý phân phối B",
                    Address = "Thôn P, Xã Q, Huyện R, Thành phố S"
                },
                new Distributor()
                {
                    Id = "Distributor-9",
                    Name = "Đại lý phân phối C",
                    Address = "Thôn T, Xã U, Huyện X, Thành phố Y"
                }
            });

            await _context.SaveChangesAsync();
        }
        if (!_context.ServiceCenters.Any())
        {
            _context.ServiceCenters.AddRange(new[]
            {
                new ServiceCenter()
                {
                    Id = "ServiceCenter-10",
                    Name = "Trung tâm bảo hành X",
                    Address = "Thôn A, Xã B, Huyện B, Thành phố C"
                },
                new ServiceCenter()
                {
                    Id = "ServiceCenter-11",
                    Name = "Trung tâm bảo hành Y",
                    Address = "Thôn D, Xã E, Huyện F, Thành phố G"
                },
                new ServiceCenter()
                {
                    Id = "ServiceCenter-12",
                    Name = "Trung tâm bảo hành X",
                    Address = "Thôn H, Xã I, Huyện J, Thành phố K"
                },
                new ServiceCenter()
                {
                    Id = "ServiceCenter-13",
                    Name = "Trung tâm bảo hành Y",
                    Address = "Thôn L, Xã M, Huyện N, Thành phố O"
                }
            });

            await _context.SaveChangesAsync();
        }
    }

    protected async Task TrySeedUserAsync()
    {
        if (!_userManager.Users.Any(u => u.Role != RoleSchema.Administrator))
        {
            var factories = await _context.Factories.ToListAsync();
            if (factories.Any())
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Nguyễn Văn F",
                    UserName = "factory",
                    Role = RoleSchema.Factory,
                    BuildingId = factories.First().Id,
                    PhoneNumber = "09" + _random.Next((int)10e6, (int)10e7),
                    Email = "Factory" + 0 + "@BigCorp.com"
                };
                await _userManager.CreateAsync(user, "factory");
                await _userManager.AddToRoleAsync(user, RoleSchema.Factory);
            }
            for (int i = 0; i < factories.Count; i++)
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Nhân viên F" + i,
                    UserName = "Factory" + i,
                    Role = RoleSchema.Factory,
                    BuildingId = factories[i].Id,
                    PhoneNumber = "09" + _random.Next((int)10e6, (int)10e7),
                    Email = "FactoryUser" + i + "@BigCorp.com"
                };
                await _userManager.CreateAsync(user, "FactoryUser" + i + "@BigCorp.com");
                await _userManager.AddToRoleAsync(user, RoleSchema.Factory);
            }
            var distributors = await _context.Distributors.ToListAsync();
            if (distributors.Any())
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Nguyễn Văn D",
                    UserName = "distributor",
                    Role = RoleSchema.Distributor,
                    BuildingId = distributors.First().Id,
                    PhoneNumber = "09" + _random.Next((int)10e6, (int)10e7),
                    Email = "Distributor" + 0 + "@BigCorp.com"
                };
                await _userManager.CreateAsync(user, "distributor");
                await _userManager.AddToRoleAsync(user, RoleSchema.Distributor);
            }
            for (int i = 0; i < distributors.Count; i++)
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Nhân viên D" + i,
                    UserName = "Distributor" + i,
                    Role = RoleSchema.Distributor,
                    BuildingId = distributors[i].Id,
                    PhoneNumber = "09" + _random.Next((int)10e6, (int)10e7),
                    Email = "DistributorUser" + i + "@BigCorp.com"
                };
                await _userManager.CreateAsync(user, "DistributorUser" + i + "@BigCorp.com");
                await _userManager.AddToRoleAsync(user, RoleSchema.Distributor);
            }
            var serviceCenters = await _context.ServiceCenters.ToListAsync();
            if (serviceCenters.Any())
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Nguyễn Văn S",
                    UserName = "service",
                    Role = RoleSchema.ServiceCenter,
                    BuildingId = serviceCenters.First().Id,
                    PhoneNumber = "09" + _random.Next((int)10e6, (int)10e7),
                    Email = "ServiceCenter" + 0 + "@BigCorp.com"
                };
                await _userManager.CreateAsync(user, "service");
                await _userManager.AddToRoleAsync(user, RoleSchema.ServiceCenter);
            }
            for (int i = 0; i < serviceCenters.Count; i++)
            {
                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Nhân viên S" + i,
                    UserName = "ServiceCenter" + i,
                    Role = RoleSchema.ServiceCenter,
                    BuildingId = serviceCenters[i].Id,
                    PhoneNumber = "09" + _random.Next((int)10e6, (int)10e7),
                    Email = "ServiceCenterUser" + i + "@BigCorp.com"
                }; 
                await _userManager.CreateAsync(user ,"ServiceCenterUser" + i + "@BigCorp.com");
                await _userManager.AddToRoleAsync(user, RoleSchema.ServiceCenter);
            }
        }
    }

    protected async Task TrySeedProductAsync()
    {
        const int PD = 20; // Trung bình số sản phẩm sản xuất trên một ngày của một cơ sở sản xuất
        const int startTime = 365 * 3 / 2; // Thời gian bắt đầu sản xuất sản phẩm

        if (!_context.Products.Any() && _context.ProductLines.Any() && _context.Factories.Any())
        {
            var productLines = await _context.ProductLines.ToListAsync();
            var factories = await _context.Factories.ToListAsync();
            int endId = 0;
            int days = _random.Next(startTime, startTime * 2);
            var time = DateTime.UtcNow.AddDays(-days);
            var factoryCreateTimes = factories.Select(f => _random.Next(days * factories.Count / (factories.Count + 1))).ToArray();
            factoryCreateTimes[0] = 0;
            for (int day = 0; day < days; day++)
            {
                for (int factoryIndex = 0; factoryIndex < factories.Count; factoryIndex++)
                {
                    if (day < factoryCreateTimes[factoryIndex]) continue;

                    var factory = factories[factoryIndex];
                    var productLine = productLines[day * productLines.Count / days];
                    int fromId = endId + 1;
                    endId = fromId + _random.Next(PD * 80 / 100, PD * 120 / 100);
                    for (int i = fromId; i <= endId; i++)
                    {
                        var product = new Product()
                        {
                            Id = i,
                            Status = ProductStatus.JustProduced,
                            DateOfManufacture = time.AddDays(day),
                            SaleDate = null,
                            ProductLineId = productLine.Id,
                            FactoryId = factory.Id,
                            DistributionId = null,
                            Customer = null
                        };
                        await _context.Products.AddAsync(product);
                    }
                }
            }
            if (endId > 0) await _context.SaveChangesAsync();
        }
    }

    protected async Task TrySeedDistributionAsync()
    {
        if (_context.Products.Any() && !_context.Distributions.Any())
        {
            const int IT = 15; // thời gian giữa 2 lần nhập hàng của một đại lý phân phối
            var factories = await _context.Factories.ToListAsync();
            var distributors = await _context.Distributors.ToListAsync();
            var products = await _context.Products
                .Where(p => p.Status == ProductStatus.JustProduced)
                .Where(p => p.DateOfManufacture.AddDays(IT) < DateTime.Now)
                .OrderBy(p => p.DateOfManufacture)
                .ThenBy(p => p.Id)
                .ToListAsync();
            if (!products.Any()) return;
            var startTime = (DateTime.Now - products.First().DateOfManufacture).Days; // Thời gian bắt đầu phân phối sản phẩm
            var PPD = products.Count / (startTime * distributors.Count / IT); // số lượng sản phẩm mỗi lần nhập hàng của một đại lý phân phối

            var distributorIndex = 0;
            var distributorCreateTimes = distributors
                .Select(f => _random.Next(startTime * distributors.Count / (distributors.Count + 1))).ToArray();
            distributorCreateTimes[0] = 0;
            while (products.Any())
            {
                var productLineId = products.First().ProductLineId;
                var factory = factories.Where(f => f.Id == products.First().FactoryId).First();
                var productsOfThisDistribution = products
                    .Where(p => p.ProductLineId == productLineId && p.FactoryId == factory.Id && p.Status == ProductStatus.JustProduced)
                    .OrderBy(p => p.DateOfManufacture)
                    .ThenBy(p => p.Id)
                    .Take(_random.Next(PPD * 80 / 100, PPD * 120 / 100))
                    .ToList();

                var time = productsOfThisDistribution.Last()
                    .DateOfManufacture
                    .AddDays(_random.Next(IT / 2, IT - 1));

                while (true)
                {
                    distributorIndex++;
                    var distributorCreateTime = distributorCreateTimes[distributorIndex % distributorCreateTimes.Length];
                    if (DateTime.Now.AddDays(distributorCreateTime - startTime) < time) break;
                }
                var distributor = distributors[distributorIndex % distributors.Count];

                var distribution = new Distribution()
                {
                    Id = Guid.NewGuid().ToString(),
                    Time = time,
                    Amount = productsOfThisDistribution.Count,
                    ProductLineId = productLineId,
                    DistributorId = distributor.Id,
                    Distributor = distributor,
                    FactoryId = factory.Id,
                    Factory = factory
                };

                distributor.Distributions.Add(distribution);
                factory.Distributions.Add(distribution);
                await _context.Distributions.AddAsync(distribution);

                foreach (var product in productsOfThisDistribution)
                {
                    product.Status = ProductStatus.JustImported;
                    product.DistributionId = distribution.Id;
                    product.DistributorId = distributor.Id;
                    products.Remove(product);
                }
            }
            await _context.SaveChangesAsync();
        }
    }

    protected async Task TrySeedSoldProductAsync()
    {
        const float RoIP = 0.1f; // Tỉ lệ sản phẩm ế
        const int PST = 30; // Thời gian trung bình bán 1 sản phẩm

        if (_context.Products.Any(p => p.Status == ProductStatus.JustImported) && !_context.Products.Any(p => p.Status == ProductStatus.Sold))
        {
            var distributions = await _context.Distributions
                .Where(d => d.Time.AddDays(PST * 120 / 100) < DateTime.Now)
                .ToListAsync();
            foreach (var distribution in distributions)
            {
                var products = await _context.Products
                    .Where(p => p.Status == ProductStatus.JustImported)
                    .Where(p => p.DistributionId == distribution.Id)
                    .ToListAsync();
                foreach (var product in products)
                {
                    if (_random.Next(1000) > 1000 * RoIP)
                    {
                        // Bán sản phẩm
                        product.SaleDate = distribution.Time.AddDays(_random.Next(PST * 80 / 100, PST * 120 / 100));
                        product.Customer = new Customer()
                        {
                            Name = "Nguyễn" + (_random.Next(2) == 0 ? " Thị " : " Văn ") + ((char)_random.Next('A', 'Z')),
                            Phone = "+849" + _random.Next((int)10e6, (int)10e7)
                        };
                        product.Status = ProductStatus.Sold;
                    }
                    else if (distribution.Time.AddDays(2 * PST) < DateTime.Now)
                    {
                        // Hàng ế
                        product.Status = ProductStatus.Inventory;
                    }
                    // Còn lại là hàng không ế nhưng chưa bán được
                }
            }
            await _context.SaveChangesAsync();
        }
    }

    protected async Task TrySeedWarrantyAsync()
    {
        const float PWR = 0.3f; // product warranty rate: tỷ lệ bảo hành sản phẩm
        const float FPWR = 0.2f; // tỷ lệ bảo hành thất bại
        const int WaittingTime = 10; // thời gian đợi bảo hành trung bình
        const int WarrantyTime = 5; // thời gian bảo hành trung bình

        if (_context.Products.Any(p => p.Status == ProductStatus.Sold) && !_context.Warranties.Any())
        {
            var serviceCenters = await _context.ServiceCenters.ToListAsync();
            var productLines = await _context.ProductLines.ToListAsync();

            var products = await _context.Products
                .Where(p => p.Status == ProductStatus.Sold)
                .Where(p => p.DistributorId != null)
                .ToListAsync();
            int numberOfWarrantyProduct = (int)(products.Count * PWR);
            for (int i = 0; i < numberOfWarrantyProduct; i++)
            {
                var product = products[_random.Next(products.Count)];
                var productLine = productLines.First(p => p.Id == product.ProductLineId);

                // nhận bảo hành
                product.Status = ProductStatus.WaitingForWarranty;
                if (product.DistributorId == null || product.SaleDate == null) continue;
                var warranty = new Warranty()
                {
                    Id = Guid.NewGuid().ToString(),
                    ProductId = product.Id,
                    DistributorId = product.DistributorId,
                    ServiceCenterId = serviceCenters[_random.Next(serviceCenters.Count)].Id,
                    StartTime = null,
                    CompletedTime = null,
                    IsSuccessed = null
                };
                await _context.Warranties.AddAsync(warranty);
                products.Remove(product);

                // bảo hành
                product.Status = ProductStatus.Warranty;
                warranty.StartTime = product.SaleDate.Value.AddDays(_random.Next(WaittingTime, productLine.WarrantyPeriod));
                if (warranty.StartTime >= DateTime.Now.AddDays(-1))
                {
                    product.Status = ProductStatus.WaitingForWarranty;
                    warranty.StartTime = null;
                    continue;
                }

                // hoàn thành bảo hành
                warranty.CompletedTime = warranty.StartTime.Value.AddDays(_random.Next(WarrantyTime * 80 / 100, WarrantyTime * 120 / 100));
                warranty.IsSuccessed = _random.Next(1000) > FPWR * 1000;
                product.Status = warranty.IsSuccessed == true ? ProductStatus.WaitingForCustomer : ProductStatus.WaitingForFactory;
                if (warranty.CompletedTime >= DateTime.Now.AddDays(-1))
                {
                    product.Status = ProductStatus.Warranty;
                    warranty.CompletedTime = null;
                    continue;
                }

                // trả sản phẩm
                if (warranty.CompletedTime.Value.AddDays(WaittingTime) < DateTime.Now)
                {
                    if (product.Status == ProductStatus.WaitingForCustomer) product.Status = ProductStatus.Sold;
                    if (product.Status == ProductStatus.WaitingForFactory) product.Status = ProductStatus.Canceled;
                }
            }
            await _context.SaveChangesAsync();
            // hết hạn bảo hành
            foreach (var productLine in productLines)
            {
                products = await _context.Products
                    .Where(p => p.ProductLineId == productLine.Id)
                    .Where(p => p.Status == ProductStatus.Sold)
                    .Where(p => p.SaleDate != null && p.SaleDate.Value.AddDays(productLine.WarrantyPeriod) < DateTime.Now)
                    .ToListAsync();
                foreach (var product in products) product.Status = ProductStatus.WarrantyExpired;
            }
            await _context.SaveChangesAsync();
        }
    }
}
