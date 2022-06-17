﻿using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Services.DTOs.Move;
using FinBoard.Services.DTOs.Resource;
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

            CreateMap<AppUser, CreateUserDto>().ReverseMap();
            CreateMap<AppUser, UserDto>().ReverseMap();

            CreateMap<Resource, ResourceDto>().ReverseMap();
            CreateMap<Resource, CreateResourceDto>().ReverseMap();

            CreateMap<Move, MoveDto>().ReverseMap();
            CreateMap<Move, CreateMoveDto>().ReverseMap();
        }
    }
}
