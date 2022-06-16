using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.User;
using FinBoard.Services.DTOs.Resource;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.ResourceService
{
    public class ResourceService : IResourceService
    {
        private readonly ILogger<ResourceService> _logger;
        private readonly IResourceRepository _resourceRepository;
        private readonly IMapper _mapper;

        public ResourceService(ILogger<ResourceService> logger, IResourceRepository resourceRepository, IMapper mapper)
        {
            _logger = logger;
            _resourceRepository = resourceRepository;
            _mapper = mapper;
        }

        public async Task<Result> CreateResourceAsync(ResourceDto resourceDto)
        {
            if (resourceDto == null)
            {
                return Result.Fail<ResourceDto>("Resource Dto cannot be null.");
            }
            var resourceEntity = _mapper.Map<Resource>(resourceDto);

            try
            {
                await _resourceRepository.AddAsync(resourceEntity);
                _resourceRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail(ex.Message);
            }

            return Result.Ok();
        }

        public async Task<Result<IEnumerable<ResourceDto>>> GetAllReourceOfAccountAsync(Guid accountId)
        {
            var result = await _resourceRepository.GetAllAsync(a => a.AccountId == accountId);
            var resultDto = _mapper.Map<IEnumerable<ResourceDto>>(result);

            if (result != null)
            {
                return Result.Ok(resultDto);
            }
            return Result.Fail<IEnumerable<ResourceDto>>("Any Data for specific account.");
        }
    }
}
