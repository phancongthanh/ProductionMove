using FluentValidation;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Distributors.Commands.ReturnToFactory;

public class ReturnToFactoryCommandValidator : AbstractValidator<ReturnToFactoryCommand>
{
    private readonly IApplicationDbContext _context;

    public ReturnToFactoryCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => GetProduct(request.ProductId))
            .NotEmpty()
            .Must(p => p?.Status == Domain.Enums.ProductStatus.JustImported)
            .WithMessage("Sản phẩm không trong kho để trả về cơ sở sản xuất!");

        RuleFor(request => request)
            .Must(IsAllow)
            .WithMessage("Sản phẩm không trong kho của đại lý!");
    }

    public Product? GetProduct(int id)
        => _context.Products.Find(id);

    public bool IsAllow(ReturnToFactoryCommand request)
    {
        var distributionId = GetProduct(request.ProductId)?.DistributionId;
        return _context.Distributions.Any(d => d.DistributorId == request.BuildingId && d.Id == distributionId);
    }
}
