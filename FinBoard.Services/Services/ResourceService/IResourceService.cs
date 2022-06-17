using FinBoard.Services.DTOs.Resource;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.ResourceService
{
    public interface IResourceService
    {
        Task<Result<IEnumerable<ResourceDto>>> GetAllReourceOfAccountAsync(Guid accountId);
        Task<Result> CreateResourceAsync(CreateResourceDto resourceDto);
        Task<Result> CheckValidityAsync(Guid resourceId, Guid value);
        Task<Result> DeleteResourceAsync(Guid resourceId);
    }
}
