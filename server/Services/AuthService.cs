using server.Dto;
using server.Models;
using server.Repositories;
using server.Helpers;


namespace server.Services {
    public class AuthService : IAuthService {
        private readonly IAuthRepository _repository;
        private readonly IJwtService _jwt;

        public AuthService (IAuthRepository repository, IJwtService jwt){
            _repository = repository;
            _jwt = jwt;
        }

        public async Task<UserDto?> RegisterUser (User user){
            user.Password = PasswordAuthenticator.HashPassword(user.Password);
            var existingUser = await _repository.RegisterUser(user);
            if(existingUser!=null) {
                return new UserDto {
                    Id = existingUser.Id,
                    Username = existingUser.Username,
                    Email = existingUser.Email,
                    Token = _jwt.GenerateToken(existingUser.Id, existingUser.Username, existingUser.Email)
                };
            }

            return null;
        }

        public async Task<UserDto?> LoginUser (LoginDto user){
            user.Password = PasswordAuthenticator.HashPassword(user.Password);
            var existingUser = await _repository.LoginUser(user);

            if(existingUser!=null) {
                return new UserDto {
                    Id = existingUser.Id,
                    Username = existingUser.Username,
                    Email = existingUser.Email,
                    Token = _jwt.GenerateToken(existingUser.Id, existingUser.Username, existingUser.Email)
                };
            }

            return null;
        }

    }
}