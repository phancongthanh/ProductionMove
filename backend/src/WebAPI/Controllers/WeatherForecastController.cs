using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.WeatherForecasts.Queries.GetWeatherForecasts;

namespace ProductionMove.WebAPI.Controllers;
public class WeatherForecastController : ApiControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
        return await Mediator.Send(new GetWeatherForecastsQuery());
    }
}
