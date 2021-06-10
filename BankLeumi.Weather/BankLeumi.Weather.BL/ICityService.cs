using System.Collections.Generic;

namespace BankLeumi.Weather.BL
{
    public interface ICityService
    {
        IEnumerable<DM.City> GetAll();
    }
}