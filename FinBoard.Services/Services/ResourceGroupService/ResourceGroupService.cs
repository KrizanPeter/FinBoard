using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.ResourceGroup;
using FinBoard.Services.DTOs.ResourceGroup;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.ResourceGroupService
{
    public class ResourceGroupService : IResourceGroupService
    {
        private readonly ILogger<ResourceGroupService> _logger;
        private readonly IResourceGroupRepository _resourceGroupRepository;
        private readonly IMapper _mapper;

        public ResourceGroupService(ILogger<ResourceGroupService> logger, IResourceGroupRepository resourceGroupRepository, IMapper mapper)
        {
            _logger = logger;
            _resourceGroupRepository = resourceGroupRepository;
            _mapper = mapper;
        }

        public async Task<Result> CreateResourceGroupAsync(CreateResourceGroupDto resourceGroupDto, Guid accountId)
        {
            if (resourceGroupDto == null)
            {
                return Result.Fail("ResourceGroup Dto cannot be null.");
            }
            var resourceEntity = _mapper.Map<ResourceGroup>(resourceGroupDto);
            resourceEntity.AccountId = accountId;

            try
            {
                await _resourceGroupRepository.AddAsync(resourceEntity);
                _resourceGroupRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        public async Task<Result<IEnumerable<ResourceGroupDto>>> GetAllReourceGroupsOfAccountAsync(Guid accountId)
        {
            var result = await _resourceGroupRepository.GetAllWithResourceAsync(accountId);
            var resultDto = _mapper.Map<IEnumerable<ResourceGroupDto>>(result);

            if (result != null)
            {
                return Result.Ok(resultDto);
            }
            return Result.Fail<IEnumerable<ResourceGroupDto>>("Any Data for specific account.");
        }
    }
}
