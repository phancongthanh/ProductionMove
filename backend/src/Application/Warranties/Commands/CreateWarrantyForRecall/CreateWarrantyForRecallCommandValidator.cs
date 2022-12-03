using FluentValidation;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.Warranties.Commands.CreateWarrantyForRecall;
public class CreateWarrantyForRecallCommandValidator : AbstractValidator<CreateWarrantyForRecallCommand>
{
    public CreateWarrantyForRecallCommandValidator(IApplicationDbContext context)
    {
        RuleFor(request => request.ServiceCenterId)
            .NotEmpty()
            .Must(id => context.ServiceCenters.Any(s => s.Id == id))
            .WithMessage("Trung tâm bảo hành không tồn tại!");
    }
}
