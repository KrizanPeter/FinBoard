using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.FinancialGoal;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Domain.Repositories.ResourceGroup;
using FinBoard.Services.DTOs.FinancialGoal;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.FinancialGoalService
{
    public class FinancialGoalService : IFinancialGoalService
    {
        private readonly ILogger<FinancialGoalService> _logger;
        private readonly IFinancialGoalRepository _financialGoalRepository;
        private readonly IResourceRepository _resourceRepository;
        private readonly IResourceGroupRepository _resourceGroupRepository;
        private readonly IMapper _mapper;

        public FinancialGoalService(
            ILogger<FinancialGoalService> logger,
            IFinancialGoalRepository financialGoalRepository,
            IResourceRepository resourceRepository,
            IResourceGroupRepository resourceGroupRepository,
            IMapper mapper)
        {
            _logger = logger;
            _financialGoalRepository = financialGoalRepository;
            _resourceRepository = resourceRepository;
            _resourceGroupRepository = resourceGroupRepository;
            _mapper = mapper;
        }

        public async Task<Result> CreateGoalAsync(CreateFinancialGoalDto goalDto, Guid accountId)
        {
            if (goalDto == null)
            {
                return Result.Fail("Goal Dto cannot be null.");
            }

            if (goalDto.ResourceId == null && goalDto.ResourceGroupId == null)
            {
                return Result.Fail("Either ResourceId or ResourceGroupId must be specified.");
            }

            var goalEntity = _mapper.Map<FinancialGoal>(goalDto);
            goalEntity.AccountId = accountId;

            try
            {
                await _financialGoalRepository.AddAsync(goalEntity);
                _financialGoalRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        public async Task<Result> DeleteGoalAsync(Guid financialGoalId, Guid accountId)
        {
            var goal = await _financialGoalRepository.GetFirstOrDefaultAsync(
                a => a.FinancialGoalId == financialGoalId && a.AccountId == accountId);

            if (goal == null)
            {
                return Result.Fail("Financial goal with specified ID not found.");
            }

            try
            {
                _financialGoalRepository.Remove(goal);
                _financialGoalRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        public async Task<Result<IEnumerable<FinancialGoalDto>>> GetAllGoalsOfAccountAsync(Guid accountId)
        {
            var goals = await _financialGoalRepository.GetAllAsync(a => a.AccountId == accountId);

            if (goals == null)
            {
                return Result.Fail<IEnumerable<FinancialGoalDto>>("No goals found.");
            }

            var resources = await _resourceRepository.GetAllWithSnapshotAsync(accountId);
            var resourceGroups = await _resourceGroupRepository.GetAllWithResourcesAndSnapshotsAsync(accountId);

            var goalDtos = new List<FinancialGoalDto>();

            foreach (var goal in goals)
            {
                var dto = new FinancialGoalDto
                {
                    FinancialGoalId = goal.FinancialGoalId,
                    AccountId = goal.AccountId,
                    ResourceId = goal.ResourceId,
                    ResourceGroupId = goal.ResourceGroupId,
                    TargetValue = goal.TargetValue,
                    DueDate = goal.DueDate,
                    RemainingDays = (int)Math.Max(0, (goal.DueDate - DateTime.Now).TotalDays),
                };

                if (goal.ResourceId.HasValue)
                {
                    var resource = resources.FirstOrDefault(r => r.ResourceId == goal.ResourceId.Value);
                    if (resource != null)
                    {
                        dto.TargetName = resource.Name;
                        dto.CurrentValue = resource.Amount;
                    }
                }
                else if (goal.ResourceGroupId.HasValue)
                {
                    var group = resourceGroups.FirstOrDefault(g => g.ResourceGroupId == goal.ResourceGroupId.Value);
                    if (group != null)
                    {
                        dto.TargetName = group.ResourceGroupName;
                        dto.CurrentValue = group.Resources?.Sum(r => r.Amount) ?? 0;
                    }
                }

                dto.PercentageFulfilled = goal.TargetValue > 0
                    ? Math.Min(100, (dto.CurrentValue / goal.TargetValue) * 100)
                    : 0;

                goalDtos.Add(dto);
            }

            return Result.Ok<IEnumerable<FinancialGoalDto>>(goalDtos);
        }
    }
}
