using System.Net.Http;
using System.Threading.Tasks;

namespace BankLeumi.Weather.Core
{
    /// <summary>
    ///      Posts the specified data object to the specified URL.
    ///      Data is serialized as JSON.
    ///      Use ContinueWith to hanlde response.
    ///      Use Result.StatusCode to get status code of response.
    ///      See https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx for further info.
    /// </summary>
    public class HttpGetRequestSender : HttpRequestSenderBase, IHttpGetRequestSender
    {
        public async Task<HttpResponseMessage> GetAsync(string url)
        {
            using (var client = GetHttpClient(url))
            {
                return await client.GetAsync(url);
            }
        }
    }
}