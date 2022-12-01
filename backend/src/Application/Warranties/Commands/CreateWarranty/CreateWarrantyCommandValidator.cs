using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Warranties.Commands.CreateWarranty;
public class CreateWarrantyCommandValidator : AbstractValidator<CreateWarrantyCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateWarrantyCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => GetProduct(request.ProductId))
            .NotEmpty()
            .Must(p => p.Status == Domain.Enums.ProductStatus.Sold || p.Status == Domain.Enums.ProductStatus.Recall)
            .WithMessage("Sản phẩm không trong trạng thái có thể bảo trì!");

        RuleFor(request => request.ServiceCenterId)
            .MustAsync(IsExist)
            .WithMessage("Trung tâm bảo hành không tồn tại!");

        RuleFor(request => request)
            .MustAsync(IsAllow)
            .WithMessage("Không có quyền bảo hành!");
    }

    protected Product? GetProduct(int productId)
        => _context.Products.SingleOrDefault(p => p.Id == productId);

    protected async Task<bool> IsExist(string serviceCenterId, CancellationToken cancellationToken = default)
        => await _context.ServiceCenters.AnyAsync(s => s.Id == serviceCenterId, cancellationToken: cancellationToken);

    protected async Task<bool> IsAllow(CreateWarrantyCommand request, CancellationToken cancellationToken = default)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) return false;

        return await _context.Distributions
            .Where(d => d.Id == product.DistributionId)
            .Where(d => d.DistributorId == request.DistributorId)
            .AnyAsync(cancellationToken);
    }
}
