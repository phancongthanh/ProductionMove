using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Common;

namespace ProductionMove.Application.Buildings.Commands.UpdateBuiding;
public class UpdateBuildingCommandValidator : AbstractValidator<UpdateBuildingCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateBuildingCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => request.Building.Id).MustAsync(IsExist).WithMessage("Cở sở không tồn tại!");

        RuleFor(r => r.Building.Name).NotEmpty().WithMessage("Tên cơ sở không hợp lệ!");

        RuleFor(r => r.Building).MustAsync(IsNotExist).WithMessage("Tên cở sở đã tồn tại!");
    }

    protected async Task<bool> IsExist(string id, CancellationToken cancellationToken = default)
    {
        return await _context.Factories.AnyAsync(f => f.Id == id, cancellationToken: cancellationToken)
            || await _context.Distributors.AnyAsync(d => d.Id == id, cancellationToken: cancellationToken)
            || await _context.ServiceCenters.AnyAsync(s => s.Id == id, cancellationToken: cancellationToken);
    }

    protected async Task<bool> IsNotExist(Building building, CancellationToken cancellationToken = default)
    {
        return !await _context.Factories.AnyAsync(f => f.Id != building.Id && f.Name == building.Name, cancellationToken: cancellationToken)
            && !await _context.Distributors.AnyAsync(d => d.Id != building.Id && d.Name == building.Name, cancellationToken: cancellationToken)
            && !await _context.ServiceCenters.AnyAsync(s => s.Id != building.Id && s.Name == building.Name, cancellationToken: cancellationToken);
    }
}
