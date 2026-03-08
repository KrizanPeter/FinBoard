using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Account;
using FinBoard.Domain.Repositories.Dashboard;
using FinBoard.Domain.Repositories.Move;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Domain.Repositories.ResourceGroup;
using FinBoard.Services.DTOs.Account;
using FinBoard.Services.DTOs.DownloadStructure;
using FinBoard.Services.Services.ResourceGroupService;
using FinBoard.Services.Services.ResourceService;
using FinBoard.Services.Services.RestoreService;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;


namespace FinBoard.Services.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly ILogger<AccountService> _logger;
        private readonly IAccountRepository _accountRepository;
        private readonly IRestoreService _restoreService;
        private readonly IResourceGroupRepository _resourceGroupRepository;
        private readonly IResourceRepository _resourceRepository;
        private readonly ISnapshotRepository _snapshotRepository;
        private readonly IDashboardRepository _dashboardRepository;
        private readonly IMapper _mapper;

        public AccountService(ILogger<AccountService> logger, IAccountRepository accountRepository, 
            IMapper mapper, IRestoreService restoreService, ISnapshotRepository snapshotRepository, 
            IResourceGroupRepository resourceGroupRepository, IResourceRepository resourceRepository,
            IDashboardRepository dashboardRepository)
        {
            _logger = logger;
            _accountRepository = accountRepository;
            _restoreService = restoreService;
            _snapshotRepository = snapshotRepository;
            _resourceGroupRepository = resourceGroupRepository;
            _resourceRepository = resourceRepository;
            _dashboardRepository = dashboardRepository;
            _mapper = mapper;
        }

        public async Task<Result<Account>> CreateNewAccountForUser(Guid userId)
        {
            Account accountEntity = new Account()
            {
                AppUserId = userId,
                DateOfCreation = DateTime.Now,
                CreatedBy = userId,
                LastModifyBy = userId,
                PeriodicityOfSnapshotsInDays = 30,
                DateOfFirstSnapshot = DateTime.Now.Date,
            };

            try
            {
                await _accountRepository.AddAsync(accountEntity);
                _accountRepository.SaveChanges();
                var accountBaseData = new AccountBaseDataDto()
                {
                    AccountId = accountEntity.AccountId,
                    PeriodicityOfSnapshotsInDays = accountEntity.PeriodicityOfSnapshotsInDays,
                    DateOfFirstSnapshot = accountEntity.DateOfFirstSnapshot,
                };
                _ = await _restoreService.RestoreDataForAccount(accountBaseData);
            }
            catch (Exception ex)
            {
                return Result.Fail<Account>(ex.Message);
            }

            return Result.Ok<Account>(accountEntity);
        }

        public async Task<Result<DownloadStructureDto>> DownloadDataStructure(Guid accountId)
        {
            var structure = new DownloadStructureDto();
            
            structure.Account = await _accountRepository.GetFirstOrDefaultAsync(a=>a.AccountId == accountId);
            structure.Snapshot = _snapshotRepository.GetAllAccountSnapshots(accountId);
            structure.ResourceGroup = _resourceGroupRepository.GetAllAsync(a=>a.AccountId == accountId).Result.ToList();
            structure.Resource = _resourceRepository.GetAllAsync(a=>a.AccountId==accountId).Result.ToList();

            return Result.Ok(structure);
        }

        public async Task<Result<AccountBaseDataDto>> GetBaseAccountData(Guid accountId)
        {
            var account = await _accountRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountId);

            if (account == null)
            {
                return Result.Fail<AccountBaseDataDto>("Account does not exist!");
            }

            AccountBaseDataDto baseDataDto = new AccountBaseDataDto()
            {
                AccountId = accountId,
                DateOfFirstSnapshot = account.DateOfFirstSnapshot,
                PeriodicityOfSnapshotsInDays = account.PeriodicityOfSnapshotsInDays,
            };

            return Result.Ok<AccountBaseDataDto>(baseDataDto);
        }

        public async Task<Result<AccountBaseDataDto>> SetBaseAccountData(Guid value, AccountBaseDataDto accountBaseDataDto)
        {
            accountBaseDataDto.DateOfFirstSnapshot = accountBaseDataDto.DateOfFirstSnapshot.Value.AddHours(2).Date;
            if (value != accountBaseDataDto.AccountId)
            {
                return Result.Fail<AccountBaseDataDto>("Invalid account!");
            }

            var account = await _accountRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountBaseDataDto.AccountId);

            if (account == null)
            {
                return Result.Fail<AccountBaseDataDto>("Account does not exist!");
            }

            if (account.PeriodicityOfSnapshotsInDays != accountBaseDataDto.PeriodicityOfSnapshotsInDays || account.DateOfFirstSnapshot != accountBaseDataDto.DateOfFirstSnapshot.Value.Date)
            {
                account.DateOfFirstSnapshot = accountBaseDataDto.DateOfFirstSnapshot;
                account.PeriodicityOfSnapshotsInDays = accountBaseDataDto.PeriodicityOfSnapshotsInDays;
                _accountRepository.SaveChanges();
                _ = await _restoreService.RestoreDataForAccount(accountBaseDataDto);
            }


            return Result.Ok<AccountBaseDataDto>(accountBaseDataDto);
        }

        public async Task<Result> UploadDataStructure(Guid accountId, Guid userId, DownloadStructureDto data)
        {
            try
            {
                var now = DateTime.UtcNow;

                await EraseExistingAccountData(accountId);
                var resourceIdMap = await RecoverResources(accountId, userId, data.Resource, now);
                await RecoverResourceGroups(accountId, userId, data.ResourceGroup, now);
                await RecoverSnapshots(accountId, userId, data.Snapshot, resourceIdMap, now);
                await UpdateAccountSettings(accountId, userId, data.Account, now);
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        private async Task EraseExistingAccountData(Guid accountId)
        {
            var existingSnapshots = _snapshotRepository.GetAllAccountSnapshots(accountId);
            _snapshotRepository.RemoveRange(existingSnapshots);
            _snapshotRepository.SaveChanges();

            var existingGroups = (await _resourceGroupRepository.GetAllAsync(a => a.AccountId == accountId)).ToList();
            _resourceGroupRepository.RemoveRange(existingGroups);
            _resourceGroupRepository.SaveChanges();

            var existingResources = (await _resourceRepository.GetAllAsync(a => a.AccountId == accountId)).ToList();
            _resourceRepository.RemoveRange(existingResources);
            _resourceRepository.SaveChanges();

            var existingCharts = (await _dashboardRepository.GetAllAsync(a => a.AccountId == accountId)).ToList();
            _dashboardRepository.RemoveRange(existingCharts);
            _dashboardRepository.SaveChanges();
        }

        private async Task<Dictionary<Guid, Guid>> RecoverResources(Guid accountId, Guid userId, List<Resource> resources, DateTime now)
        {
            var resourceIdMap = new Dictionary<Guid, Guid>();

            foreach (var resource in resources)
            {
                var newResourceId = Guid.NewGuid();
                resourceIdMap[resource.ResourceId] = newResourceId;

                var newResource = new Resource
                {
                    ResourceId = newResourceId,
                    AccountId = accountId,
                    Name = resource.Name,
                    Currency = resource.Currency,
                    CreatedBy = userId,
                    LastModifyBy = userId,
                    DateOfCreation = now,
                    DateOfLastModification = now
                };
                await _resourceRepository.AddAsync(newResource);
            }
            _resourceRepository.SaveChanges();

            return resourceIdMap;
        }

        private async Task RecoverResourceGroups(Guid accountId, Guid userId, List<ResourceGroup> resourceGroups, DateTime now)
        {
            foreach (var group in resourceGroups)
            {
                var newGroup = new ResourceGroup
                {
                    ResourceGroupId = Guid.NewGuid(),
                    AccountId = accountId,
                    ResourceGroupName = group.ResourceGroupName,
                    CreatedBy = userId,
                    LastModifyBy = userId,
                    DateOfCreation = now,
                    DateOfLastModification = now
                };
                await _resourceGroupRepository.AddAsync(newGroup);
            }
            _resourceGroupRepository.SaveChanges();
        }

        private async Task RecoverSnapshots(Guid accountId, Guid userId, List<Snapshot> snapshots, Dictionary<Guid, Guid> resourceIdMap, DateTime now)
        {
            var newSnapshots = new List<Snapshot>();
            foreach (var snapshot in snapshots)
            {
                if (!resourceIdMap.TryGetValue(snapshot.ResourceId, out var newResourceId))
                    continue;

                newSnapshots.Add(new Snapshot
                {
                    SnapshotId = Guid.NewGuid(),
                    ResourceId = newResourceId,
                    AccountId = accountId,
                    Amount = snapshot.Amount,
                    DateOfSnapshot = snapshot.DateOfSnapshot,
                    CreatedBy = userId,
                    LastModifyBy = userId,
                    DateOfCreation = now,
                    DateOfLastModification = now
                });
            }
            await _snapshotRepository.AddRangeAsync(newSnapshots);
            _snapshotRepository.SaveChanges();
        }

        private async Task UpdateAccountSettings(Guid accountId, Guid userId, Account uploadedAccount, DateTime now)
        {
            var account = await _accountRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountId);
            if (account != null && uploadedAccount != null)
            {
                account.DateOfFirstSnapshot = uploadedAccount.DateOfFirstSnapshot;
                account.PeriodicityOfSnapshotsInDays = uploadedAccount.PeriodicityOfSnapshotsInDays;
                account.LastModifyBy = userId;
                account.DateOfLastModification = now;
                _accountRepository.SaveChanges();
            }
        }
    }
}
