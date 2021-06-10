namespace BankLeumi.Weather.DI
{
    public interface IIoCC
    {
        T Resolve<T>();

        void Register<T>() where T : class, new();

        void Register<TInterface>(TInterface singleton, bool perThread = false);

        bool TryResolve<T>(out T instance);
    }
}