using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Repository
{
    public interface IRepository<T> where T : class, IBaseEntity
    {
        Task AddAsync(T entity);
        void Remove(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        void RemoveRange(IEnumerable<T> entities);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = null
        );
        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>>? filter = null);
        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>>? filter = null, string includeProperties = null);
    }
}
