using MediatR;
using Microsoft.Extensions.Logging;
using ProductionMove.Domain.Events;

namespace ProductionMove.Application.ProductLines.EventHandlers;
public class UpdatedProductLineEventHandler : INotificationHandler<UpdatedProductLineEvent>
{
    private readonly ILogger<UpdatedProductLineEventHandler> _logger;

    public UpdatedProductLineEventHandler(ILogger<UpdatedProductLineEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(UpdatedProductLineEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ProductionMove Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
