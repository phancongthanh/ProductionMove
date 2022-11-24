using MediatR;
using Microsoft.Extensions.Logging;
using ProductionMove.Domain.Events;

namespace ProductionMove.Application.ProductLines.EventHandlers;
public class CreatedProductLineEventHandler : INotificationHandler<CreatedProductLineEvent>
{
    private readonly ILogger<CreatedProductLineEventHandler> _logger;

    public CreatedProductLineEventHandler(ILogger<CreatedProductLineEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(CreatedProductLineEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ProductionMove Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
