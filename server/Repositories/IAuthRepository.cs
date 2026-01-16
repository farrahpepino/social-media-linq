using server.Models;
using server.Dto;

namespace server.Repositories {

    public interface IAuthRepository {
        Task RegisterUser (User User);
        Task<bool> LoginUser (LoginDto user);
    }
}