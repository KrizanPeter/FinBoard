using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class FinancialGoal : BaseEntity
    {
        public Guid FinancialGoalId { get; set; }
        public Guid AccountId { get; set; }
        public Guid? ResourceId { get; set; }
        public Guid? ResourceGroupId { get; set; }
        public float TargetValue { get; set; }
        public DateTime DueDate { get; set; }
    }
}
