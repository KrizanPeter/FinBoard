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


    }
}
