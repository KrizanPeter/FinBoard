using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Services.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserRegisterDto>().ReverseMap();
        }
    }
}
