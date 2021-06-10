using System.Net.Http;
using System.Threading.Tasks;

namespace BankLeumi.Weather.Core
{
    public interface IHttpGetRequestSender
    {
        Task<HttpResponseMessage> GetAsync(string url);
    }
}