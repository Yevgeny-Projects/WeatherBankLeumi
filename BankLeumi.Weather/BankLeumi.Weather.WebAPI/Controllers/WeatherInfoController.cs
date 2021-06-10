using BankLeumi.Weather.BL;
using BankLeumi.Weather.DI;
using BankLeumi.Weather.DM;
using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace BankLeumi.Weather.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/bank-leumi/weather-info/")]
    public class WeatherInfoController : BaseApiController
    {
        private readonly ILogger<WeatherInfoController> _logger;
        private readonly IConfiguration _configuration;

        public WeatherInfoController(ILogger<WeatherInfoController> logger,
                                     IConfiguration configuration) : base(configuration)
        {
            Ensure.That(logger, nameof(logger)).IsNotNull();
            Ensure.That(configuration, nameof(configuration)).IsNotNull();
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Get(City city)
        {
            var input = city;
            string key = _configuration.GetValue<string>("AppSettings:OpenWeatherServiceKey");
            string openWeatherApiUrl = _configuration.GetValue<string>("appSettings:OpenWeatherApiUrl");
            var weatherResponseModel = await IoCC.Instance.Resolve<IWeatherInfoService>()
                                            .GetBodyContentAsStringAsync(input, key, openWeatherApiUrl);
            return Ok(weatherResponseModel);
        }
    }
}