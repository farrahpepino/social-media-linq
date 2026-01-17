using server.Dto;
using server.Models;

namespace server.Services {
    public interface IAuthService {
        Task<UserDto?> RegisterUser (User User);
        Task<UserDto?> LoginUser (LoginDto user);
    }
}