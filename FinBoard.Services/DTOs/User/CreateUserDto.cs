﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.DTOs.User
{
    public class CreateUserDto
    {
        public string Nick { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
