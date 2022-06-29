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
        public string Name { get; set; }
        public Currency Currency { get; set; }
    }
}
