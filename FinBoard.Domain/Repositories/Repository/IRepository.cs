using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Repository
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        void AddRange(IEnumerable<T> entities);
        void RemoveRange(IEnumerable<T> entities);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null);
        T GetFirstOrDefault(Expression<Func<T, bool>>? filter = null);
    }
}
