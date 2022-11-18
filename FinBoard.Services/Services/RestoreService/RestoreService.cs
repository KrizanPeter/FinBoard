using AutoMapper;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Services.DTOs.Account;
using FinBoard.Services.Services.Move;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.RestoreService
{
    public class RestoreService : IRestoreService
    {
        private readonly ILogger<RestoreService> _logger;
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;
        private readonly ISnapshotService _snapshotService;

        public RestoreService(ILogger<RestoreService> logger, IResourceRepository resourceRepository, IMapper mapper, ISnapshotService snapshotService)
        {
            _logger = logger;
            _resourceRepository = resourceRepository;
            _mapper = mapper;
            _snapshotService = snapshotService;
        }
        public async Task<Result> RestoreDataForAccount(AccountBaseDataDto accountBaseDataDto)
        {
            _ = await _snapshotService.DeleteAccountsSnapshots(accountBaseDataDto.AccountId);
            var resources = await _resourceRepository.GetAllAsync(a => a.AccountId == accountBaseDataDto.AccountId);
            if (resources == null) return Result.Ok();
            foreach (var resource in resources)
            {
                resource.Snapshots = _snapshotService.GenerateSnapshotsForAccount(accountBaseDataDto);
            }
            _resourceRepository.SaveChanges();
            return Result.Ok();
        }
    }
}
