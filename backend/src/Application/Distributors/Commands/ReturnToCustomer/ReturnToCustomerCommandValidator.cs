using FluentValidation;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Distributors.Commands.ReturnToCustomer;

public class ReturnToCustomerCommandValidator : AbstractValidator<ReturnToCustomerCommand>
{
    private readonly IApplicationDbContext _context;

    public ReturnToCustomerCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => GetProduct(request.ProductId))
            .NotEmpty()
            .Must(p => p?.Status == Domain.Enums.ProductStatus.WaitingForCustomer)
            .WithMessage("Sản phẩm không trong kho để trả cho khách hàng!");

        RuleFor(request => request)
            .Must(IsAllow)
            .WithMessage("Sản phẩm không trong kho của đại lý!");
    }

    public Product? GetProduct(int id)
        => _context.Products.Find(id);

    public bool IsAllow(ReturnToCustomerCommand request)
    {
        var distributionId = GetProduct(request.ProductId)?.DistributionId;
        return _context.Distributions.Any(d => d.DistributorId == request.BuildingId && d.Id == distributionId);
    }
}
