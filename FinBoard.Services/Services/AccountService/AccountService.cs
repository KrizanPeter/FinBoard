using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Account;
using FinBoard.Utils.Result;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly ILogger<AccountService> _logger;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public AccountService(ILogger<AccountService> logger, IAccountRepository accountRepository, IMapper mapper)
        {
            _logger = logger;
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<Result<Account>> CreateNewAccountForUser(Guid userId)
        {
            Account accountEntity = new Account()
            {
                AppUserId = userId,
                DateOfCreation = DateTime.Now,
                CreatedBy = userId,
                LastModifyBy = userId
            };

            try
            {
                await _accountRepository.AddAsync(accountEntity);
                _accountRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return Result.Fail<Account>(ex.Message);
            }

            return Result.Ok<Account>(accountEntity);
        }
    }
}
