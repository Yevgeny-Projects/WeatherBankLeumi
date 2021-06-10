using BankLeumi.Weather.DM;
using BankLeumi.Weather.NHibernate;

namespace BankLeumi.Weather.DAL
{
    /// <summary>
    /// Action log repository logic.
    /// </summary>
    public class ActionLogRepository : Repository<ActionLog>, IActionLogRepository
    {
        private static NHibernateHelper context;

        /// <summary>
        /// Constructor
        /// </summary>
        public ActionLogRepository() : base(context)
        {
        }

        #region Getter/Setter

        public NHibernateHelper ActionLogContext
        {
            get { return Context as NHibernateHelper; }
        }

        #endregion Getter/Setter
    }
}