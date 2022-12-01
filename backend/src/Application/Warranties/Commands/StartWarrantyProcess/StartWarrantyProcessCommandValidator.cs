using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.Warranties.Commands.StartWarrantyProcess;

public class StartWarrantyProcessCommandValidator : AbstractValidator<StartWarrantyProcessCommand>
{
    private readonly IApplicationDbContext _context;

    public StartWarrantyProcessCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => request.ProductId)
            .MustAsync(IsExist)
            .WithMessage("Sản phẩm không trong trạng thái bảo trì!");

        RuleFor(request => request)
            .MustAsync(IsAllow)
            .WithMessage("Không có quyền bảo hành!");
    }

    protected async Task<bool> IsExist(int productId, CancellationToken cancellationToken = default)
        => await _context.Products
        .Where(p => p.Id == productId && p.Status == Domain.Enums.ProductStatus.WaitingForWarranty)
        .AnyAsync(cancellationToken);

    protected async Task<bool> IsAllow(StartWarrantyProcessCommand request, CancellationToken cancellationToken = default)
        => await _context.Warranties
        .Where(w => w.ProductId == request.ProductId)
        .Where(w => w.ServiceCenterId == request.BuildingId)
        .Where(w => w.StartTime == null)
        .AnyAsync(cancellationToken);
}
