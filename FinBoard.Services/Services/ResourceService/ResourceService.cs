using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Services.DTOs.Account;
using FinBoard.Services.DTOs.Resource;
using FinBoard.Services.Services.AccountService;
using FinBoard.Services.Services.Move;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.ResourceService
{
    public class ResourceService : IResourceService
    {
        private readonly ILogger<ResourceService> _logger;
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly ISnapshotService _snapshotService;

        public ResourceService(ILogger<ResourceService> logger, IResourceRepository resourceRepository, IMapper mapper, IAccountService accountService, ISnapshotService snapshotService)
        {
            _logger = logger;
            _resourceRepository = resourceRepository;
            _mapper = mapper;
            _accountService = accountService;
            _snapshotService = snapshotService;
        }

        public async Task<Result> CheckValidityAsync(Guid resourceId, Guid accountId)
        {
            var result = await _resourceRepository.GetAllAsync(a => a.AccountId == accountId && a.ResourceId == resourceId);
            if (result.Any())
            {
                return Result.Ok();
            }
            return Result.Fail("Resource does not belong under your account.");
        }

        public async Task<Result> CreateResourceAsync(CreateResourceDto resourceDto, Guid accountId)
        {
            var accountInfo = await _accountService.GetBaseAccountData(accountId);
            if (resourceDto == null || accountInfo.Value == null)
            {
                return Result.Fail("Resource Dto cannot be null.");
            }
            var resourceEntity = _mapper.Map<Resource>(resourceDto);
            resourceEntity.AccountId = accountId;
            resourceEntity.Snapshots = _snapshotService.GenerateSnapshotsForAccount(accountInfo.Value);

            try
            {
                await _resourceRepository.AddAsync(resourceEntity);
                _resourceRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        public async Task<Result> DeleteResourceAsync(Guid resourceId)
        {
            var result = await _resourceRepository.GetFirstOrDefaultAsync(a => a.ResourceId == resourceId);
            if (result == null)
            {
                return Result.Fail("Resource with specified ID not exist.");
            }
            try
            {
                _resourceRepository.Remove(result);
                _resourceRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
            return Result.Ok();
        }

        public async Task<Result<IEnumerable<ResourceDto>>> GetAllReourceOfAccountAsync(Guid accountId)
        {
            var result = await _resourceRepository.GetAllWithSnapshotAsync(accountId);
            var resultDto = _mapper.Map<IEnumerable<ResourceDto>>(result);

            if (result != null)
            {
                return Result.Ok(resultDto);
            }
            return Result.Fail<IEnumerable<ResourceDto>>("Any Data for specific account.");
        }

    }
}
