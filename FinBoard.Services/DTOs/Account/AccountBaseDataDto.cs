using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Account
{
    public class AccountBaseDataDto
    {
        public Guid AccountId { get; set; }
        public DateTime? DateOfFirstSnapshot { get; set; }
        public int PeriodicityOfSnapshotsInDays { get; set; }
    }
}
