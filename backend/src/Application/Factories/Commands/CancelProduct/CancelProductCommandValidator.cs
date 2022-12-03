using FluentValidation;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Factories.Commands.CancelProduct;
public class CancelProductCommandValidator : AbstractValidator<CancelProductCommand>
{
    private readonly IApplicationDbContext _context;

    public CancelProductCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => GetProduct(request.ProductId))
            .NotEmpty()
            .Must(p => p?.Status == Domain.Enums.ProductStatus.WaitingForFactory)
            .WithMessage("Sản phẩm không lỗi để hủy!");

        RuleFor(request => request)
            .Must(IsAllow)
            .WithMessage("Sản phẩm không do nhà máy sản xuất!");
    }

    public Product? GetProduct(int id)
        => _context.Products.Find(id);

    public bool IsAllow(CancelProductCommand request)
        => GetProduct(request.ProductId)?.FactoryId == request.BuildingId;
}
