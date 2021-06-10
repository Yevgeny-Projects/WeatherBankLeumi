using System;
using System.Threading;
using Unity;
using Unity.RegistrationByConvention;

namespace BankLeumi.Weather.DI
{
    /// <summary>
    /// This class represent dependency injection logic
    /// </summary>
    public class IoCC : IIoCC
    {
        private static IIoCC _globalContainer = new IoCC();

        #region Getter/Setter

        public static IIoCC Instance
        {
            get
            {
                return _globalContainer;
            }
        }

        #endregion Getter/Setter

        //private static ILogger _logger = Logger.GetLogger(typeof(IoCC));
        private const string LOGGER_PREFIX = "IoCC";

        private IUnityContainer _container;
        private ThreadLocal<IUnityContainer> _threadContainer;

        public IoCC()
            : this(new UnityContainer())
        {
        }

        #region Public methods

        private IoCC(IUnityContainer container)
        {
            _container = container;
            _threadContainer = new ThreadLocal<IUnityContainer>(_container.CreateChildContainer);
        }

        public T Resolve<T>()
        {
            return _threadContainer.Value.Resolve<T>();
        }

        public void Register<T>() where T : class, new()
        {
            Type type = typeof(T);
            _container.RegisterTypes(new Type[] { type }, WithMappings.FromAllInterfaces);
        }

        public void Register<TInterface>(TInterface singleton, bool perThread = false)
        {
            IUnityContainer container = perThread ? _threadContainer.Value : _container;
            container.RegisterInstance<TInterface>(singleton);
        }

        public bool TryResolve<T>(out T instance)
        {
            instance = default(T);
            if (_threadContainer.Value.IsRegistered<T>())
            {
                instance = _threadContainer.Value.Resolve<T>();
                return true;
            }
            else
            {
                return false;
            }
        }

        #endregion Public methods
    }
}