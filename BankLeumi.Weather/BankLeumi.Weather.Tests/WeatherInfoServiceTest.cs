using BankLeumi.Weather.BL;
using BankLeumi.Weather.Core;
using BankLeumi.Weather.DAL;
using BankLeumi.Weather.DM;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace BankLeumi.Weather.Tests
{
    [TestClass]
    public class WeatherInfoServiceTest
    {
        #region Fields

        private Mock<IActionLogRepository> _actionRepository;
        private IWeatherInfoService _weatherInfoService;
        private Mock<IActionLogService> _actionLogService;
        private Mock<IHttpGetRequestSender> _sender;

        #endregion Fields

        #region Test Helpers

        [TestInitialize]
        public void Init()
        {
            _actionRepository = new Mock<IActionLogRepository>();
            _actionLogService = new Mock<IActionLogService>();
            _sender = new Mock<IHttpGetRequestSender>();
            _weatherInfoService = new WeatherInfoService(_actionLogService.Object,
                                                        _sender.Object);
        }

        #endregion Test Helpers

        [TestMethod]
        public async Task GetBodyContentAsStringAsync_Test()
        {
            var city = new City()
            {
                Name = "Tel Aviv",
                ShortStateName = "IL",
                StateName = "Israel"
            };

            var model = new WeatherResponseModel()
            {
                name = "Givataim"
            };

            var response = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(model));

            //Assign
            _actionLogService.Setup(c => c.InsertActionToDB(It.IsAny<ActionLog>()));

            _sender.Setup(c => c.GetAsync(It.IsAny<string>()))
                    .ReturnsAsync(response);

            //Act
            var answer = await _weatherInfoService.GetBodyContentAsStringAsync(city, "1", "2");

            //Verify
            _actionLogService.Verify(c => c.InsertActionToDB(It.IsAny<ActionLog>()));

            //Assert
            Assert.AreEqual(model.name, answer.name);
        }
    }
}