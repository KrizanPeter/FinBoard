using FinBoard.Domain.Context;
using FinBoard.Domain.Entities.Base;
using FinBoard.Utils.PersistenceService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Repository
{
    public class Repository<T> : IRepository<T> where T : class, IBaseEntity
    {
        private readonly IPersistentService _persistentService;
        public readonly DataContext _db;
        internal DbSet<T> dbSet;

        public Repository(DataContext db, IPersistentService persistentService)
        {
            _persistentService = persistentService;
            _db = db;
            this.dbSet = db.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            entity.CreatedBy = _persistentService.GetUserIdForRequest();
            entity.LastModifyBy = entity.CreatedBy;
            entity.DateOfCreation = DateTime.Now;
            entity.DateOfLastModification = entity.DateOfCreation;
            await dbSet.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await dbSet.AddRangeAsync(entities);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            IQueryable<T> querry = dbSet;
            return await querry.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = null)
        {
            IQueryable<T> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            //coma separated include properties
            if (includeProperties != null)
            {
                foreach (var prop in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(prop);
                }
            }
            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            return await query.ToListAsync();
        }

        public async Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>>? filter = null, string includeProperties = null)
        {
            IQueryable<T> querry = dbSet;
            if (filter != null)
            {
                querry = querry.Where(filter);
            }
            if (includeProperties != null)
            {
                foreach (var prop in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    querry = querry.Include(prop);
                }
            }
            return await querry.FirstOrDefaultAsync();
        }

        public async Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> querry = dbSet;
            if (filter != null)
            {
                querry = querry.Where(filter);
            }
            return await querry.FirstOrDefaultAsync();
        }

        public void Remove(T entity)
        {
            dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
        }
    }
}
