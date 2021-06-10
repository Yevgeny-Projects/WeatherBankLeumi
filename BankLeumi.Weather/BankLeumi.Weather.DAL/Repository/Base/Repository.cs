using BankLeumi.Weather.NHibernate;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace BankLeumi.Weather.DAL
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly NHibernateHelper Context;

        public string ConnectionString
        {
            set
            {
                NHibernateHelper.ConnectionString = value;
            }
        }

        public Repository(NHibernateHelper context)
        {
            Context = context;
        }

        public TEntity Get(int id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return session.Get<TEntity>(id);
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                return session.CreateCriteria(typeof(TEntity)).List<TEntity>();
            }
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return null;
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return null;
        }

        public void Add(TEntity entity)
        {
            ISession session = null;
            try
            {
                session = NHibernateHelper.OpenSession();

                // Save given object to DB
                session.Save(entity);
                session.Flush();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (session != null)
                {
                    // Close Session
                    session.Close();
                }
            }
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
        }

        public void Remove(TEntity entity)
        {
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
        }
    }
}