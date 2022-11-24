using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Infrastructure.Services;
public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
