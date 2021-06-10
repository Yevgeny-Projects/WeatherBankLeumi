using System;
using System.Net.Http;

namespace BankLeumi.Weather.Core
{
    /// <summary>
    /// Base HTTP sender class.
    /// </summary>
    public abstract class HttpRequestSenderBase
    {
        #region Protected Methods

        /// <summary>
        ///    Returns a new HttpClient.
        /// </summary>
        protected HttpClient GetHttpClient(string url)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(url);

            return client;
        }

        #endregion Protected Methods
    }
}