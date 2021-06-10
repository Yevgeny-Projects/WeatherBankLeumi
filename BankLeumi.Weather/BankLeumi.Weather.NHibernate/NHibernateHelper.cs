using BankLeumi.Weather.Core;
using BankLeumi.Weather.DI;
using BankLeumi.Weather.Mapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace BankLeumi.Weather.NHibernate
{
    /// <summary>
    /// This class reprents nhibernate helper logic.
    /// </summary>
    public class NHibernateHelper
    {
        private static ISessionFactory _sessionFactory;

        #region Getter/Setter

        public static string ConnectionString { get; set; }

        private static ISessionFactory SessionFactory
        {
            get
            {
                var appSettings = IoCC.Instance.Resolve<AppSettings>();
                var connectionString = appSettings.ConnectionString;
                var config = Fluently.Configure()
                  .Database(MsSqlConfiguration.MsSql2008.ConnectionString(connectionString).ShowSql()
                  );
                AddAvailableMappings(config);
                _sessionFactory = config
                 .Mappings(mappings: m => m.FluentMappings.AddFromAssemblyOf<ActionLogMap>())
                 .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(false, true))
                 .BuildSessionFactory();
                return _sessionFactory;
            }
        }

        public NHibernateHelper()
        {

        }

        #endregion Getter/Setter

        #region Public methods

        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }

        #endregion Public methods

        #region Private methods

        private static void AddAvailableMappings(FluentConfiguration fluentConfiguration)
        {
            fluentConfiguration.Mappings(mc => mc.FluentMappings.AddFromAssemblyOf<ActionLogMap>());
            fluentConfiguration.Mappings(mc => mc.FluentMappings.AddFromAssemblyOf<CityMap>());
        }

        #endregion Private methods
    }
}