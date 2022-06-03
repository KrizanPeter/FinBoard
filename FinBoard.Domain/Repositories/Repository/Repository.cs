using FinBoard.Domain.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public readonly DataContext _db;
        internal DbSet<T> dbSet;

        public Repository(DataContext db)
        {
            _db = db;
            this.dbSet = db.Set<T>();
        }

        public void Add(T entity)
        {
            this.dbSet.Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            this.dbSet.AddRange(entities);
        }

        public IEnumerable<T> GetAll()
        {
            IQueryable<T> querry = dbSet;
            return querry.ToList();
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> querry = dbSet;
            if (filter != null)
            {
                querry = querry.Where(filter);
            }
            return querry.ToList();
        }

        public T GetFirstOrDefault(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> querry = dbSet;
            if(filter != null)
            {
                querry = querry.Where(filter);
            }
            return querry.FirstOrDefault();
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
