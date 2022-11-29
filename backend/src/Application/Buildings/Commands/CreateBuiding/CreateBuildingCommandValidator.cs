using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.Buildings.Commands.CreateBuiding;
public class CreateBuildingCommandValidator : AbstractValidator<CreateBuildingCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateBuildingCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(r => r.Building.Name).NotEmpty().WithMessage("Tên không hợp lệ!");

        RuleFor(r => r.Building.Name).MustAsync(IsNotExist).WithMessage("Tên đã tồn tại!");
    }

    protected async Task<bool> IsNotExist(string name, CancellationToken cancellationToken = default)
    {
        return !await _context.Factories.AnyAsync(f => f.Name == name, cancellationToken: cancellationToken)
            && !await _context.Distributors.AnyAsync(d => d.Name == name, cancellationToken: cancellationToken)
            && !await _context.ServiceCenters.AnyAsync(s => s.Name == name, cancellationToken: cancellationToken);
    }
}
