using BankLeumi.Weather.Core;
using BankLeumi.Weather.DI;
using EnsureThat;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BankLeumi.Weather.WebAPI.Controllers
{
    public class BaseApiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BaseApiController(IConfiguration configuration)
        {
            Ensure.That(configuration, nameof(configuration)).IsNotNull();
            _configuration = configuration;
            var appSettings = IoCC.Instance.Resolve<AppSettings>();
            appSettings.ConnectionString = _configuration.GetValue<string>("appSettings:ConnectionString");
        }
    }
}