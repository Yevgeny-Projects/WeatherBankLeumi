using BankLeumi.Weather.DM;
using BankLeumi.Weather.NHibernate;

namespace BankLeumi.Weather.DAL
{
    /// <summary>
    /// City repository logic.
    /// </summary>
    public class CityRepository : Repository<City>, ICityRepository
    {
        private static NHibernateHelper context;

        /// <summary>
        /// Constructor
        /// </summary>
        public CityRepository() : base(context)
        {
        }

        #region Getter/Setter

        public NHibernateHelper CityContext
        {
            get { return Context as NHibernateHelper; }
        }

        #endregion Getter/Setter
    }
}