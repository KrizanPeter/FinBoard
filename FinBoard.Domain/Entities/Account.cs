﻿using FinBoard.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Entities
{
    public class Account : BaseEntity
    {
        public Guid AccountId { get; set; }
        public Guid UserId { get; set; }   

        public User User { get; set; }
        public IEnumerable<Resource> Resources { get; set; }
    }
}