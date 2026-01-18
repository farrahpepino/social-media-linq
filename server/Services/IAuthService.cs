using server.Dto;
using server.Models;

namespace server.Services {
    public interface IAuthService {
        Task<string?> RegisterUser (User User);
        Task<string?> LoginUser (LoginDto user);
    }
}