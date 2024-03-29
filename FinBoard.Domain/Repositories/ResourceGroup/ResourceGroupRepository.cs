﻿using FinBoard.Domain.Context;
using FinBoard.Domain.Repositories.Repository;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Utils.PersistenceService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Repositories.ResourceGroup
{
    public class ResourceGroupRepository : Repository<Entities.ResourceGroup>, IResourceGroupRepository
    {
        private readonly DataContext _db;

        public ResourceGroupRepository(DataContext db, IPersistentService persistenceService) : base(db, persistenceService)
        {
            _db = db;
        }

        public async Task<IEnumerable<Entities.ResourceGroup>> GetAllWithResourceAsync(Guid accountId)
        {
            var result = await _db.ResourceGroups
                .Where(r => r.AccountId == accountId)
                .Include(a => a.Resources)
                .ToListAsync();
            return result;
        }

        public Task<List<Entities.ResourceGroup>> GetAllWithResourcesAndSnapshotsAsync(Guid accountId)
        {
            var completeResourceGroups = _db.ResourceGroups.Where(a => a.AccountId == accountId)
                .Include(a => a.Resources)
                .ThenInclude(a => a.Snapshots.OrderBy(a => a.DateOfSnapshot))
                .ToListAsync();
            return completeResourceGroups;
        }

        public async Task<Entities.ResourceGroup?> GetDataForGroupChart(Guid dashboardChartId)
        {
            var result = await _db.ResourceGroups.Where(a => a.ResourceGroupId == dashboardChartId)
                .Include(a => a.Resources)
                .ThenInclude(a => a.Snapshots)
                .SingleOrDefaultAsync();
            return result;
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Update(Entities.ResourceGroup user)
        {
            throw new NotImplementedException();
        }
    }
}
