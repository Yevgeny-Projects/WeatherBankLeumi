using BankLeumi.Weather.DM;
using System.Threading.Tasks;

namespace BankLeumi.Weather.BL
{
    public interface IWeatherInfoService
    {
        Task<WeatherResponseModel> GetBodyContentAsStringAsync(City city,
                                                                string key,
                                                                string openWeatherApiUrl);
    }
}