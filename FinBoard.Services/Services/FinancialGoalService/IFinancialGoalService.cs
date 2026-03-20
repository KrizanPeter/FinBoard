using FinBoard.Services.DTOs.FinancialGoal;
using FinBoard.Utils.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.FinancialGoalService
{
    public interface IFinancialGoalService
    {
        Task<Result<IEnumerable<FinancialGoalDto>>> GetAllGoalsOfAccountAsync(Guid accountId);
        Task<Result> CreateGoalAsync(CreateFinancialGoalDto goalDto, Guid accountId);
        Task<Result> DeleteGoalAsync(Guid financialGoalId, Guid accountId);
    }
}
