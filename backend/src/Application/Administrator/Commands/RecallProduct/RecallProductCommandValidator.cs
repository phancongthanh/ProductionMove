using FluentValidation;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.Administrator.Commands.RecallProduct;
public class RecallProductCommandValidator : AbstractValidator<RecallProductCommand>
{
    public RecallProductCommandValidator(IApplicationDbContext context)
    {
        RuleFor(request => request.ProductLineId)
            .NotEmpty()
            .Must(id => context.ProductLines.Any(p => p.Id == id))
            .WithMessage("Dòng sản phẩm không tồn tại");
    }
}
