using server.Dto;
using server.Models;

namespace server.Services {
    public interface IAuthService {
        Task RegisterUser (User User);
        Task<bool> LoginUser (LoginDto user);
    }
}