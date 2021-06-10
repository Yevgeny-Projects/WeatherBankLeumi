using BankLeumi.Weather.DM;
using BankLeumi.Weather.NHibernate;

namespace BankLeumi.Weather.DAL
{
    public interface IActionLogRepository : IRepository<ActionLog>
    {
        NHibernateHelper ActionLogContext { get; }
    }
}