using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Distributions.Commands.AddDistribution;
public class AddDistributionCommandValidator : AbstractValidator<AddDistributionCommand>
{
    private readonly IApplicationDbContext _context;

    public AddDistributionCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => request.DistributorId).NotEmpty().MustAsync(IsExist).WithMessage("Đại lý phân phối không tồn tại!");

        RuleFor(request => GetProducts(request.FromId, request.ToId))
            .Must(products => products.Select(p => p.ProductLineId).Count() == 1)
            .WithMessage("Các sản phẩm không cùng thuộc một dòng sản phẩm");

        RuleFor(request => GetProducts(request.FromId, request.ToId))
            .Must(products => products.Select(p => p.FactoryId).Count() == 1)
            .WithMessage("Các sản phẩm không cùng thuộc một cơ sở sản xuất");

        RuleFor(request => GetProducts(request.FromId, request.ToId))
            .Must(products => products.All(p => p.Status == Domain.Enums.ProductStatus.JustProduced))
            .WithMessage("Có sản phẩm không nằm trong kho của cơ sở sản xuất!");
    }

    protected IQueryable<Product> GetProducts(int fromId, int toId) =>  _context.Products.Where(p => p.Id >= fromId && p.Id <= toId);

    protected async Task<bool> IsExist(string distributorId, CancellationToken cancellationToken = default)
        => await _context.Distributors.AnyAsync(d => d.Id == distributorId, cancellationToken: cancellationToken);
}
