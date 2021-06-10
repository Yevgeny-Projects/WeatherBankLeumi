using BankLeumi.Weather.DM;
using FluentNHibernate.Mapping;

namespace BankLeumi.Weather.Mapping
{
    public class CityMap : ClassMap<City>
    {
        public CityMap()
        {
            this.Table("City");
            Id(x => x.Id);
            Map(x => x.StateName);
            Map(x => x.ShortStateName);
            Map(x => x.StateCode);
            Map(x => x.Name);
            Map(x => x.Zip);
        }
    }
}