using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.Account;
using FinBoard.Services.DTOs.Account;
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
                PeriodicityOfSnapshotsInDays = 30,
                DateOfFirstSnapshot = DateTime.Now,
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

        public async Task<Result<AccountBaseDataDto>> GetBaseAccountData(Guid accountId)
        {
            var account = await _accountRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountId);

            if (account == null)
            {
                return Result.Fail<AccountBaseDataDto>("Account does not exist!");
            }

            AccountBaseDataDto baseDataDto = new AccountBaseDataDto()
            {
                AccountId = accountId,
                DateOfFirstSnapshot = account.DateOfFirstSnapshot,
                PeriodicityOfSnapshotsInDays = account.PeriodicityOfSnapshotsInDays,
            };

            return Result.Ok<AccountBaseDataDto>(baseDataDto);
        }

        public async Task<Result<AccountBaseDataDto>> SetBaseAccountData(Guid value, AccountBaseDataDto accountBaseDataDto)
        {
            if (value != accountBaseDataDto.AccountId)
            {
                return Result.Fail<AccountBaseDataDto>("Invalid account!");
            }

            var account = await _accountRepository.GetFirstOrDefaultAsync(a => a.AccountId == accountBaseDataDto.AccountId);

            if (account == null)
            {
                return Result.Fail<AccountBaseDataDto>("Account does not exist!");
            }

            account.DateOfFirstSnapshot = accountBaseDataDto.DateOfFirstSnapshot.Value.AddHours(2).Date;
            account.PeriodicityOfSnapshotsInDays = accountBaseDataDto.PeriodicityOfSnapshotsInDays;

            _accountRepository.SaveChanges();
            return Result.Ok<AccountBaseDataDto>(accountBaseDataDto);
        }
    }
}
