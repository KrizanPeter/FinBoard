using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Move;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Services.DTOs.Account;
using FinBoard.Services.DTOs.Move;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.Move
{
    public class SnapshotService : ISnapshotService
    {
        private readonly ILogger<SnapshotService> _logger;
        private readonly ISnapshotRepository _snapshotRepository;
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;

        public SnapshotService(ILogger<SnapshotService> logger, ISnapshotRepository snapshotRepository, IMapper mapper, IResourceRepository resourceRepository)
        {
            _resourceRepository = resourceRepository;
            _logger = logger;
            _snapshotRepository = snapshotRepository;
            _mapper = mapper;
        }

        public async Task<Result> CheckValidityAsync(Guid moveId, Guid accountId)
        {
            var move = await _snapshotRepository.GetFirstOrDefaultAsync(a => a.SnapshotId == moveId);

            if (move == null) return Result.Fail("Move with specified ID not exist");

            var resource = await _resourceRepository.GetFirstOrDefaultAsync(a => a.ResourceId == move.ResourceId);

            if (resource.AccountId != accountId)
                return Result.Fail("This move does not belong under your account");

            return Result.Ok();
        }

        public async Task<Result> CreateSnapshotForResourceAsync(CreateSnapshotDto moveDto, Guid accountId)
        {
            moveDto.DateOfSnapshot = moveDto.DateOfSnapshot.Date;
            if (moveDto == null)
            {
                return Result.Fail("MoveDto cannot be null.");
            }
            var moveEntity = await _snapshotRepository.GetFirstOrDefaultAsync(a => a.DateOfSnapshot == moveDto.DateOfSnapshot && a.AccountId == accountId && a.ResourceId == moveDto.ResourceId);
            moveEntity.Amount = moveDto.Amount;
            try
            {
                _snapshotRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();

        }

        public async Task<Result> DeleteAccountsSnapshots(Guid accountId)
        {
            var snapshots = await _snapshotRepository.GetAllAsync(a => a.AccountId == accountId);
            foreach (var snapshot in snapshots)
            {
                _snapshotRepository.Remove(snapshot);
            }
            _snapshotRepository.SaveChanges();

            return Result.Ok();
        }


        public async Task<Result> DeleteSnapshotAsync(Guid moveId)
        {
            var moveEntity = await _snapshotRepository.GetFirstOrDefaultAsync(a => a.SnapshotId == moveId);
            if (moveEntity == null)
            {
                return Result.Fail("Move with specified ID not exist.");
            }
            try
            {
                _snapshotRepository.Remove(moveEntity);
                _snapshotRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
            return Result.Ok();
        }

        public ICollection<Snapshot> GenerateSnapshotsForAccount(AccountBaseDataDto accountInfo)
        {
            List<Snapshot> snapshots = new List<Snapshot>();
            var floatingDate = accountInfo.DateOfFirstSnapshot;
            var now = DateTime.Now;
            while (floatingDate <= now)
            {
                snapshots.Add(new Snapshot() { AccountId = accountInfo.AccountId, DateOfSnapshot = floatingDate.Value.Date });
                if (accountInfo.PeriodicityOfSnapshotsInDays % 30 == 0)
                {
                    floatingDate = floatingDate.Value.AddMonths(accountInfo.PeriodicityOfSnapshotsInDays / 30);
                }
                else
                {
                    floatingDate = floatingDate.Value.AddDays(accountInfo.PeriodicityOfSnapshotsInDays);
                }
            }
            return snapshots;
        }

        public async Task<Result<IEnumerable<SnapshotDto>>> GetAllSnapshotsOfResourceAsync(Guid resourceId)
        {
            var result = await _snapshotRepository.GetAllAsync(a => a.ResourceId == resourceId, a => a.OrderByDescending(a => a.DateOfSnapshot));
            var movesDtoList = _mapper.Map<IEnumerable<SnapshotDto>>(result);
            return Result.Ok(movesDtoList);
        }

        public async Task<Result<IEnumerable<SnapshotDto>>> GetAllSnapshotsForDate(Guid accountId, DateTime date)
        {
            var result = await _snapshotRepository.GetAllAsync(a => a.AccountId == accountId && a.DateOfSnapshot == date);
            var movesDtoList = _mapper.Map<IEnumerable<SnapshotDto>>(result);

            return Result.Ok(movesDtoList);
        }
    }
}
