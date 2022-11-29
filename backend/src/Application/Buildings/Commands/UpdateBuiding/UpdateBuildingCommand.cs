using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Domain.Common;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Events;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Buildings.Commands.UpdateBuiding;
public class UpdateBuildingCommand : IRequest<Result>
{
    public RoleSchema Type { get; }

    public Building Building { get; }

    public UpdateBuildingCommand(RoleSchema type, Building building)
    {
        Type = type;
        Building = building;
    }
}

public class UpdateBuildingCommandHandler : IRequestHandler<UpdateBuildingCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public UpdateBuildingCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(UpdateBuildingCommand request, CancellationToken cancellationToken)
    {
        switch ((string)request.Type)
        {
            case Schema.Role.Factory:
                var factory = await _context.Factories.FindAsync(new object?[] { request.Building.Id }, cancellationToken: cancellationToken);
                if (factory == null) throw new NotFoundException(nameof(Factory), request.Building.Id);
                factory.Name = request.Building.Name;
                factory.Address = request.Building.Address;
                factory.AddDomainEvent(new UpdatedBuildingEvent(factory));
                break;
            case Schema.Role.Distributor:
                var distributor = await _context.Distributors.FindAsync(new object?[] { request.Building.Id }, cancellationToken: cancellationToken);
                if (distributor == null) throw new NotFoundException(nameof(Distributor), request.Building.Id);
                distributor.Name = request.Building.Name;
                distributor.Address = request.Building.Address;
                distributor.AddDomainEvent(new UpdatedBuildingEvent(distributor));
                break;
            case Schema.Role.ServiceCenter:
                var serviceCenter = await _context.ServiceCenters.FindAsync(new object?[] { request.Building.Id }, cancellationToken: cancellationToken);
                if (serviceCenter == null) throw new NotFoundException(nameof(ServiceCenter), request.Building.Id);
                serviceCenter.Name = request.Building.Name;
                serviceCenter.Address = request.Building.Address;
                serviceCenter.AddDomainEvent(new UpdatedBuildingEvent(serviceCenter));
                break;
            default: throw new InvalidOperationException();
        }

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}