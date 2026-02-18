using server.Models;

namespace server.Services {
    public interface IUserService {
        Task<IEnumerable<User>> SearchUser(string input);
        Task<User> GetUser(string username);

    }
}