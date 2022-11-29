using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.ProductLines.Commands.UpdateProductLine;

public class UpdateProductLineCommandValidator : AbstractValidator<UpdateProductLineCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateProductLineCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => request.ProductLineId).MustAsync(IsExisted).WithMessage("Dòng sản phẩm không tồn tại!");
    }

    private async Task<bool> IsExisted(string id, CancellationToken cancellationToken = default)
     => await _context.ProductLines.AnyAsync(pl => pl.Id == id, cancellationToken);
}
