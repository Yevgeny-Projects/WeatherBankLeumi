using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace BankLeumi.Weather.DAL
{
    public interface IRepository<TEntity> where TEntity : class
    {
        string ConnectionString { set; }

        TEntity Get(int id);

        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        void Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);

        void Remove(TEntity entity);

        void RemoveRange(IEnumerable<TEntity> entities);
    }
}