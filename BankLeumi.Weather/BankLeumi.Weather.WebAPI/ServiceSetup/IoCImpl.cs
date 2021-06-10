using BankLeumi.Weather.BL;
using BankLeumi.Weather.Core;
using BankLeumi.Weather.DAL;
using BankLeumi.Weather.DI;

namespace BankLeumi.Weather.WebAPI
{
    public class IoCImpl
    {
        public IoCImpl()
        {
        }

        #region Public methods

        public void Configure()
        {
            IoCC.Instance.Register(new AppSettings());
            IoCC.Instance.Register<IHttpGetRequestSender>(new HttpGetRequestSender());
            IoCC.Instance.Register<IActionLogRepository>(new ActionLogRepository());
            IoCC.Instance.Register<ICityRepository>(new CityRepository());
            IoCC.Instance.Register<IActionLogService>(new ActionLogService(
                IoCC.Instance.Resolve<IActionLogRepository>()));
            IoCC.Instance.Register<ICityService>(new CityService(
               IoCC.Instance.Resolve<ICityRepository>()));
            IoCC.Instance.Register<IWeatherInfoService>(new WeatherInfoService(
                IoCC.Instance.Resolve<IActionLogService>(),
                IoCC.Instance.Resolve<IHttpGetRequestSender>()
                ));
        }

        #endregion Public methods
    }
}