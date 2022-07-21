using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Resource;
using FinBoard.Domain.Repositories.ResourceGroup;
using FinBoard.Services.DTOs.Resource;
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
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;

        public ResourceGroupService(ILogger<ResourceGroupService> logger, IResourceGroupRepository resourceGroupRepository, IResourceRepository resourceRepository, IMapper mapper)
        {
            _logger = logger;
            _resourceGroupRepository = resourceGroupRepository;
            _resourceRepository = resourceRepository;
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

        public async Task<Result> DeleteResourceGroupAsync(Guid resourceGroupId)
        {
            var result = await _resourceGroupRepository.GetFirstOrDefaultAsync(a => a.ResourceGroupId == resourceGroupId);
            if (result == null)
            {
                return Result.Fail("Resource with specified ID not exist.");
            }
            try
            {
                _resourceGroupRepository.Remove(result);
                _resourceGroupRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }
            return Result.Ok();
        }


        public async Task<Result> CheckValidityAsync(Guid resourceGroupId, Guid accountId)
        {
            var result = await _resourceGroupRepository.GetAllAsync(a => a.AccountId == accountId && a.ResourceGroupId == resourceGroupId);
            if (result.Any())
            {
                return Result.Ok();
            }
            return Result.Fail("Resource does not belong under your account.");
        }

        public async Task<Result> AddResourcesToGroup(GroupResourcesDto addResourceToGroupDto)
        {
            var resourceGroup = await _resourceGroupRepository.GetFirstOrDefaultAsync(a => a.ResourceGroupId == addResourceToGroupDto.ResourceGroupId, "Resources");

            if (resourceGroup == null)
            {
                return Result.Fail("ResourceGroup is not exist.");
            }

            resourceGroup.Resources.Clear();

            foreach (var res in addResourceToGroupDto.Resources)
            {
                if (res.IsInGroup)
                {
                    var resource = await _resourceRepository.GetFirstOrDefaultAsync(a => a.ResourceId == res.ResourceId);

                    if (resource == null)
                    {
                        return Result.Fail("One or more results were not found");
                    }

                    resourceGroup.Resources.Add(resource);
                }
            }
            _resourceGroupRepository.SaveChanges();
            return Result.Ok();
        }

        public async Task<Result<GroupResourcesDto>> GetGroupsResourcesAsync(Guid resourceGroupId, Guid accountId)
        {
            GroupResourcesDto groupResourcesDto = new GroupResourcesDto();
            groupResourcesDto.ResourceGroupId = resourceGroupId;
            var resources = await _resourceRepository.GetAllAsync(a => a.AccountId == accountId);
            var resourceGroup = await _resourceGroupRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountId && a.ResourceGroupId == resourceGroupId, "Resources");

            if (resourceGroup == null || resourceGroup.Resources == null)
            {
                return Result.Fail<GroupResourcesDto>("Resource group was not found");
            }
            foreach (var resource in resources)
            {
                var item = new ResourceForGroupDto() { ResourceId = resource.ResourceId, Name = resource.Name, IsInGroup = resourceGroup.Resources.Any(a => a.ResourceId == resource.ResourceId) };
                groupResourcesDto.Resources.Add(item);
            }

            return Result.Ok(groupResourcesDto);
        }
    }
}
