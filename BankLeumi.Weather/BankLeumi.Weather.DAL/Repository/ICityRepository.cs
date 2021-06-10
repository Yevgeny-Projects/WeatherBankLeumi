using BankLeumi.Weather.DM;
using BankLeumi.Weather.NHibernate;

namespace BankLeumi.Weather.DAL
{
    public interface ICityRepository : IRepository<City>
    {
        NHibernateHelper CityContext { get; }
    }
}