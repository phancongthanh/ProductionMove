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

        RuleFor(request => request.FactoryId).NotEmpty().MustAsync(IsExist).WithMessage("Cơ sở sản xuất không tồn tại!");

        RuleFor(request => request).MustAsync(HasProducts).WithMessage("Đơn nhập hàng không có sản phẩm nào thỏa mãn!");
    }

    protected async Task<bool> HasProducts(AddDistributionCommand request, CancellationToken cancellationToken = default)
        => await _context.Products
        .Where(p => p.ProductLineId == request.ProductLineId)
        .Where(p => p.FactoryId == request.FactoryId)
        .Where(p => p.Id >= request.FromId && p.Id <= request.ToId)
        .Where(p => p.Status == Domain.Enums.ProductStatus.JustProduced && p.DistributorId == null && p.DistributionId == null)
        .AnyAsync(cancellationToken);

    protected async Task<bool> IsExist(string distributorId, CancellationToken cancellationToken = default)
        => await _context.Distributors.AnyAsync(d => d.Id == distributorId, cancellationToken: cancellationToken)
            || await _context.Factories.AnyAsync(f => f.Id == distributorId, cancellationToken: cancellationToken);
}
