using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Products.Commands.SellProduct;
public class SellProductCommandValidator : AbstractValidator<SellProductCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public SellProductCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;

        RuleFor(request => GetProduct(request.ProductId))
            .NotEmpty()
            .WithMessage("Sản phẩm không tồn tại!");

        RuleFor(request => GetProduct(request.ProductId))
            .Must(p => p?.Status == Domain.Enums.ProductStatus.JustImported)
            .WithMessage("Sản phẩm không có trong kho!");

        RuleFor(request => request)
            .Must(IsAllow)
            .WithMessage("Sản phẩm không có trong kho!");
    }

    protected Product? GetProduct(int id) => _context.Products.Find(id);

    protected bool IsAllow(SellProductCommand request)
    {
        var product = GetProduct(request.ProductId)?.DistributionId;
        var distributorId = _context.Distributions.AsNoTracking().SingleOrDefault(d => d.Id == product)?.DistributorId;
        return distributorId == _currentUser.BuildingId;
    }
}
