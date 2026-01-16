using server.Dto;
using server.Models;
using server.Repositories;
using server.Helpers;


namespace server.Services {
    public class AuthService : IAuthService {
        private readonly AuthRepository _repository;

        public AuthService (AuthRepository repository){
            _repository = repository;
        }

        public async Task RegisterUser (User user){
            user.Password = PasswordAuthenticator.HashPassword(user.Password);
            await _repository.RegisterUser(user);
        }

        public async Task<bool> LoginUser (LoginDto user){
            user.Password = PasswordAuthenticator.HashPassword(user.Password);
            return await _repository.LoginUser(user);
        }

    }
}