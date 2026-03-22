using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.FinancialGoal
{
    public class UpdateFinancialGoalDto
    {
        public Guid FinancialGoalId { get; set; }
        public Guid? ResourceId { get; set; }
        public Guid? ResourceGroupId { get; set; }
        public float TargetValue { get; set; }
        public DateTime DueDate { get; set; }
    }
}
