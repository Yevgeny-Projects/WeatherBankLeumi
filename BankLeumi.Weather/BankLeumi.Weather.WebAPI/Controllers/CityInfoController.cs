using BankLeumi.Weather.BL;
using BankLeumi.Weather.DI;
using BankLeumi.Weather.DM;
using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace BankLeumi.Weather.WebAPI.Controllers
{
    [Route("api/v1/bank-leumi/city-info/")]
    [ApiController]
    [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Any, NoStore = false)]
    public class CityInfoController : BaseApiController
    {
        private readonly ILogger<CityInfoController> _logger;

        public CityInfoController(ILogger<CityInfoController> logger,
                                  IConfiguration configuration) : base(configuration)
        {
            Ensure.That(logger, nameof(logger)).IsNotNull();
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<City> Get()
        {
            return IoCC.Instance.Resolve<ICityService>().GetAll();
        }
    }
}