using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.FinancialGoal
{
    public class FinancialGoalDto
    {
        public Guid FinancialGoalId { get; set; }
        public Guid AccountId { get; set; }
        public Guid? ResourceId { get; set; }
        public Guid? ResourceGroupId { get; set; }
        public string TargetName { get; set; }
        public float TargetValue { get; set; }
        public float CurrentValue { get; set; }
        public float PercentageFulfilled { get; set; }
        public DateTime DueDate { get; set; }
        public int RemainingDays { get; set; }
    }
}
