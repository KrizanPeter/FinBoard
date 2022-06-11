﻿using AutoMapper;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Repositories.User;
using FinBoard.Services.DTOs.User;
using FinBoard.Services.Services.TokenService;
using FinBoard.Utils.Result;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Services.Services.AuthServices
{
    public class AuthService : IAuthService
    {
        private readonly ILogger<AuthService> _logger;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AuthService(ILogger<AuthService> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IUserRepository userRepository, ITokenService tokenService, IMapper mapper)
        {
            _logger = logger;
            _tokenService = tokenService;
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<Result<UserDto>> RegisterNewUserAsync(UserAuthDto registerDto)
        {
            var userEntity = _mapper.Map<AppUser>(registerDto);
            userEntity.DateOfCreation = DateTime.Now;
            userEntity.DateOfLastModification = DateTime.Now;
            
            var result = await _userManager.CreateAsync(userEntity, registerDto.Password);

            if (!result.Succeeded)
            {
                var msg = string.Join(String.Empty, result.Errors.Select(a => a.Description).ToList());
                return Result.Fail<UserDto>(msg);
            }

            var registeredUser = _mapper.Map<UserDto>(userEntity);
            registeredUser.Token = _tokenService.GetToken(userEntity);
            return Result.Ok(registeredUser);
        }

        public async Task<Result<UserDto>> CheckPassAndLogIn(UserAuthDto loginUser)
        {
            var user = _userManager.Users.FirstOrDefault(a => a.UserName.ToUpper() == loginUser.UserName.ToUpper());
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginUser.Password, false);
            if (!result.Succeeded)
            {
                return Result.Fail<UserDto>("Wrong password.");
            }

            var loggedUser = _mapper.Map<UserDto>(user);
            loggedUser.Token = _tokenService.GetToken(user);

            return Result.Ok(loggedUser);   
        }
    }
}
