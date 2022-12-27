using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;

namespace ProductionMove.Application.Buildings.Queries.GetBuildings;
public class GetBuildingsQuery : IRequest<BuildingsModel>
{
}

public class GetBuildingsQueryHandler : IRequestHandler<GetBuildingsQuery, BuildingsModel>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetBuildingsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BuildingsModel> Handle(GetBuildingsQuery request, CancellationToken cancellationToken)
    {
        var buildings = new BuildingsModel()
        {
            Factories = await _context.Factories
                .Select(f => _mapper.Map<FactoryModel>(f))
                .ToListAsync(cancellationToken: cancellationToken),
            Distributors = await _context.Distributors
                .Select(d => _mapper.Map<DistributorModel>(d))
                .ToListAsync(cancellationToken: cancellationToken),
            ServiceCenters = await _context.ServiceCenters
                .Select(s => _mapper.Map<ServiceCenterModel>(s))
                .ToListAsync(cancellationToken: cancellationToken)
        };
        return buildings;
    }
}