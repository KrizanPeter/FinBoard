using FinBoard.Services.DTOs.ResourceGroup;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.ResourceGroupService
{
    public interface IResourceGroupService
    {
        Task<Result<IEnumerable<ResourceGroupDto>>> GetAllReourceGroupsOfAccountAsync(Guid accountId);
        Task<Result> CreateResourceGroupAsync(CreateResourceGroupDto resourceDto, Guid accountId);
        Task<Result> CheckValidityAsync(Guid resourceGroupId, Guid value);
        Task<Result> DeleteResourceGroupAsync(Guid resourceGroupId);
        Task<Result> AddResourcesToGroup(GroupResourcesDto addResourceToGroupDto);
        Task<Result<GroupResourcesDto>> GetGroupsResourcesAsync(Guid resourceGroupId, Guid accountId);
    }
}
