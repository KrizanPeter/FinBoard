using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppUserController : ControllerBase
{

    private readonly ILogger<AppUserController> _logger;

    public AppUserController(ILogger<AppUserController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IActionResult> GetAsync()
    {
        return Ok();
    }
}
