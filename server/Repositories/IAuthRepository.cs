using server.Models;
using server.Dto;

namespace server.Repositories {
    public interface IAuthRepository {
        Task<UserDto?> RegisterUser (RegisterDto User);
        Task<UserDto?> LoginUser (LoginDto user);
    }
}