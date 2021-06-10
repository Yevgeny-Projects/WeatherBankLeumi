using BankLeumi.Weather.DM;
using FluentNHibernate.Mapping;

namespace BankLeumi.Weather.Mapping
{
    public class ActionLogMap : ClassMap<ActionLog>
    {
        public ActionLogMap()
        {
            this.Table("ActionLog");
            Id(x => x.Id);
            Map(x => x.Action);
            Map(x => x.Date);
            Map(x => x.Details);
            Map(x => x.UserId);
        }
    }
}