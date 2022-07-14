using AutoMapper;
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

        public Task<Result> CreateResourceGroupAsync(CreateResourceGroupDto resourceDto, Guid accountId)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IEnumerable<ResourceGroupDto>>> GetAllReourceGroupsOfAccountAsync(Guid accountId)
        {
            throw new NotImplementedException();
        }
    }
}
