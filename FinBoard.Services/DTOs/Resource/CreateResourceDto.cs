using FinBoard.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.Resource
{
    public class CreateResourceDto
    {
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public Currency Currency { get; set; }
        public float Amount { get; set; }
    }
}
