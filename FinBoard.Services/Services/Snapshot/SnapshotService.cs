using AutoMapper;
using FinBoard.Domain.Repositories.Move;
using FinBoard.Domain.Repositories.Resource;
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
        private readonly ISnapshotRepository _moveRepository;
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;

        public SnapshotService(ILogger<SnapshotService> logger, ISnapshotRepository moveRepository, IMapper mapper, IResourceRepository resourceRepository)
        {
            _resourceRepository = resourceRepository;
            _logger = logger;
            _moveRepository = moveRepository;
            _mapper = mapper;
        }

        public async Task<Result> CheckValidityAsync(Guid moveId, Guid accountId)
        {
            var move = await _moveRepository.GetFirstOrDefaultAsync(a => a.SnapshotId == moveId);

            if (move == null) return Result.Fail("Move with specified ID not exist");

            var resource = await _resourceRepository.GetFirstOrDefaultAsync(a => a.ResourceId == move.ResourceId);

            if (resource.AccountId != accountId)
                return Result.Fail("This move does not belong under your account");

            return Result.Ok();
        }

        public async Task<Result> CreateMoveForResourceAsync(CreateSnapshotDto moveDto)
        {
            if (moveDto == null)
            {
                return Result.Fail("MoveDto cannot be null.");
            }
            var moveEntity = _mapper.Map<Domain.Entities.Snapshot>(moveDto);
            moveEntity.DateOfChange = moveEntity.DateOfChange.Date;
            try
            {
                await _moveRepository.AddAsync(moveEntity);
                _moveRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();

        }

        public async Task<Result> DeleteMoveAsync(Guid moveId)
        {
            var moveEntity = await _moveRepository.GetFirstOrDefaultAsync(a => a.SnapshotId == moveId);
            if (moveEntity == null)
            {
                return Result.Fail("Move with specified ID not exist.");
            }
            try
            {
                _moveRepository.Remove(moveEntity);
                _moveRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
            return Result.Ok();
        }

        public async Task<Result<IEnumerable<SnapshotDto>>> GetAllMovesOfResourceAsync(Guid resourceId)
        {
            var result = await _moveRepository.GetAllAsync(a => a.ResourceId == resourceId, a => a.OrderByDescending(a => a.DateOfChange));
            var movesDtoList = _mapper.Map<IEnumerable<SnapshotDto>>(result);
            return Result.Ok(movesDtoList);
        }
    }
}
