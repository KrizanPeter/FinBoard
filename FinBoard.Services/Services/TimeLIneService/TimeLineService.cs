using AutoMapper;
using FinBoard.Domain.Repositories.Account;
using FinBoard.Domain.Repositories.Move;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Services.DTOs.Snapshot;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.TimeLIneService
{
    public class TimeLineService : ITimeLineService
    {
        private readonly ILogger<TimeLineService> _logger;
        private readonly ISnapshotRepository _snapshotRepository;
        private readonly IResourceRepository _resourceRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public TimeLineService(ILogger<TimeLineService> logger, ISnapshotRepository snapshotRepository, IMapper mapper, IResourceRepository resourceRepository, IAccountRepository accountRepository)
        {
            _resourceRepository = resourceRepository;
            _logger = logger;
            _snapshotRepository = snapshotRepository;
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<Result<List<SnapshotTimelineElementDto>>> ConstructTimeLine(Guid accountId)
        {
            List<SnapshotTimelineElementDto> timeline = new List<SnapshotTimelineElementDto>();
            var accountInfo = await _accountRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountId);
            var resources = await _resourceRepository.GetAllAsync(a => a.AccountId == accountId);
            var snapshots = _snapshotRepository.GetAllAccountSnapshots(accountId);
            var floatingDate = accountInfo.DateOfFirstSnapshot;

            while (floatingDate <= DateTime.Now)
            {
                timeline.Add(CreateNewSnapshotElementDto(resources, snapshots, floatingDate));
                if (accountInfo.PeriodicityOfSnapshotsInDays % 30 == 0)
                {
                    floatingDate = floatingDate.Value.AddMonths(accountInfo.PeriodicityOfSnapshotsInDays / 30);
                }
                else
                {
                    floatingDate = floatingDate.Value.AddDays(accountInfo.PeriodicityOfSnapshotsInDays);
                }
            }

            return Result.Ok(timeline);
        }

        private SnapshotTimelineElementDto CreateNewSnapshotElementDto(IEnumerable<Domain.Entities.Resource> resources, List<Domain.Entities.Snapshot> snapshots, DateTime? floatingDate)
        {
            SnapshotTimelineElementDto newSnapshotElementDto = new SnapshotTimelineElementDto();
            newSnapshotElementDto.Date = floatingDate;
            var elementSuccess = true;
            foreach (var resource in resources)
            {
                bool existSnapshot = CheckIfSnapshotExist(snapshots, floatingDate, resource.ResourceId);
                if (!existSnapshot) elementSuccess = false;
                newSnapshotElementDto.Resources.Add(new TimelineResourceDto() { Name = resource.Name, IsSnapped = existSnapshot });
            }
            newSnapshotElementDto.IsSuccess = elementSuccess;
            return newSnapshotElementDto;
        }

        private bool CheckIfSnapshotExist(List<Domain.Entities.Snapshot> snapshots, DateTime? floatingDate, Guid resourceId)
        {
            var result = snapshots.Where(a => a.ResourceId == resourceId && a.DateOfSnapshot == floatingDate).SingleOrDefault();
            return (result != null && result.Amount != null);
        }
    }
}
