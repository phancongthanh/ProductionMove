using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.Products.Commands.AddProduct;
public class AddProductCommandValidator : AbstractValidator<AddProductCommand>
{
    private readonly IApplicationDbContext _context;
    public AddProductCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => request.ProductLineId).NotEmpty().MustAsync(IsExist).WithMessage("Dòng sản phẩm không tồn tại!");

        RuleFor(r => r).MustAsync(IsNotExist).WithMessage("Sản phẩm đã tồn tại!");
    }

    protected async Task<bool> IsExist(string productLineId, CancellationToken cancellationToken = default)
        => await _context.ProductLines.AnyAsync(p => p.Id == productLineId, cancellationToken: cancellationToken);

    protected async Task<bool> IsNotExist(AddProductCommand request, CancellationToken cancellationToken = default)
        => !await _context.Products.Where(p => p.Id >= request.FromId && p.Id <= request.ToId)
        .AnyAsync(cancellationToken: cancellationToken);
}
