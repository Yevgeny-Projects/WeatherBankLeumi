using BankLeumi.Weather.Core;
using BankLeumi.Weather.DM;
using EnsureThat;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace BankLeumi.Weather.BL
{
    /// <summary>
    /// This class represent call external weather api logic.
    /// </summary>
    public class WeatherInfoService : IWeatherInfoService
    {
        #region Fields

        private IActionLogService _actionLogService;
        private IHttpGetRequestSender _sender;

        #endregion Fields

        #region Constructor

        public WeatherInfoService(IActionLogService actionLogService,
                                    IHttpGetRequestSender sender
                                    )
        {
            Ensure.That(actionLogService, nameof(actionLogService)).IsNotNull();
            Ensure.That(sender, nameof(sender)).IsNotNull();
            _actionLogService = actionLogService;
            _sender = sender;
        }

        #endregion Constructor

        #region Public methods

        /// <summary>
        ///  Call to openweather api to get weather information.
        /// </summary>
        /// <param name="city"></param>
        /// <param name="key"></param>
        /// <param name="openWeatherApiUrl"></param>
        /// <returns>Task<WeatherResponseModel></returns>
        public async Task<WeatherResponseModel> GetBodyContentAsStringAsync(City city,
                                                                            string key,
                                                                            string openWeatherApiUrl)
        {
            try
            {
                string url = $"{openWeatherApiUrl}{city.Name},{city.ShortStateName}&APPID={key}&units=metric";

                var response = await _sender.GetAsync(url);

                var stringContent = await response.Content.ReadAsStringAsync();
                _actionLogService.InsertActionToDB(
                    new ActionLog()
                    {
                        Date = DateTime.Now,
                        Action = "Get weather info",
                        Details = JsonConvert.SerializeObject(city)
                    }
                );

                return JsonConvert.DeserializeObject<WeatherResponseModel>(stringContent);
            }
            catch
            {
                _actionLogService.InsertActionToDB(
                  new ActionLog()
                  {
                      Date = DateTime.Now,
                      Action = "Get weather info - error",
                      Details = JsonConvert.SerializeObject(city)
                  }
              );
                return null;
            }
        }

        #endregion Public methods
    }
}