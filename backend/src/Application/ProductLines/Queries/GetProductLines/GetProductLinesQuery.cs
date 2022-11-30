using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.ProductLines.Queries.GetProductLines;
public class GetProductLinesQuery : IRequest<IEnumerable<ProductLine>>
{
}

public class GetProductLineQueryHandler : IRequestHandler<GetProductLinesQuery, IEnumerable<ProductLine>>
{
    private readonly IApplicationDbContext _context;

    public GetProductLineQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<IEnumerable<ProductLine>> Handle(GetProductLinesQuery request, CancellationToken cancellationToken)
        => await _context.ProductLines.ToListAsync(cancellationToken);
}