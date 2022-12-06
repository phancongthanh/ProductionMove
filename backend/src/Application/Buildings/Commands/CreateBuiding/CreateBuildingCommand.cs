using MediatR;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Common;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Events;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Buildings.Commands.CreateBuiding;

[Authorize(Roles = Schema.Role.Administrator)]
public class CreateBuildingCommand : IRequest<Result>
{
    public RoleSchema Type { get; }

    public Building Building { get; }

    public CreateBuildingCommand(RoleSchema type, Building building)
    {
        Type = type;
        Building = building;
    }
}

public class CreateBuildingCommandHandler : IRequestHandler<CreateBuildingCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateBuildingCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateBuildingCommand request, CancellationToken cancellationToken)
    {
        switch ((string)request.Type)
        {
            case Schema.Role.Factory:
                var factory = new Factory()
                {
                    Id = request.Building.Id,
                    Name = request.Building.Name,
                    Address = request.Building.Address
                };
                factory.AddDomainEvent(new CreatedBuildingEvent(factory));
                await _context.Factories.AddAsync(factory, cancellationToken);
                break;
            case Schema.Role.Distributor:
                var distributor = new Distributor()
                {
                    Id = request.Building.Id,
                    Name = request.Building.Name,
                    Address = request.Building.Address
                };
                distributor.AddDomainEvent(new CreatedBuildingEvent(distributor));
                await _context.Distributors.AddAsync(distributor, cancellationToken);
                break;
            case Schema.Role.ServiceCenter:
                var serviceCenter = new ServiceCenter()
                {
                    Id = request.Building.Id,
                    Name = request.Building.Name,
                    Address = request.Building.Address
                };
                serviceCenter.AddDomainEvent(new CreatedBuildingEvent(serviceCenter));
                await _context.ServiceCenters.AddAsync(serviceCenter, cancellationToken);
                break;
            default: throw new InvalidOperationException();
        }

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}