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
    public class MoveService : IMoveService
    {
        private readonly ILogger<MoveService> _logger;
        private readonly IMoveRepository _moveRepository;
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;

        public MoveService(ILogger<MoveService> logger, IMoveRepository moveRepository, IMapper mapper, IResourceRepository resourceRepository)
        {
            _resourceRepository = resourceRepository;
            _logger = logger;
            _moveRepository = moveRepository;
            _mapper = mapper;
        }

        public async Task<Result> CheckValidityAsync(Guid moveId, Guid accountId)
        {
            var move = await _moveRepository.GetFirstOrDefaultAsync(a => a.MoveId == moveId);

            if (move == null) return Result.Fail("Move with specified ID not exist");

            var resource = await _resourceRepository.GetFirstOrDefaultAsync(a => a.ResourceId == move.ResourceId);

            if (resource.AccountId != accountId)
                return Result.Fail("This move does not belong under your account");

            return Result.Ok();
        }

        public async Task<Result> CreateMoveForResourceAsync(CreateMoveDto moveDto)
        {
            if (moveDto == null)
            {
                return Result.Fail("MoveDto cannot be null.");
            }
            var moveEntity = _mapper.Map<Domain.Entities.Move>(moveDto);
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
            var moveEntity = await _moveRepository.GetFirstOrDefaultAsync(a => a.MoveId == moveId);
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

        public async Task<Result<IEnumerable<MoveDto>>> GetAllMovesOfResourceAsync(Guid resourceId)
        {
            var result = await _moveRepository.GetAllAsync(a => a.ResourceId == resourceId);
            var movesDtoList = _mapper.Map<IEnumerable<MoveDto>>(result);
            return Result.Ok(movesDtoList);
        }
    }
}
