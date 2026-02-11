using server.Models;

namespace server.Repositories {
    public interface IUserRepository {
        Task<IEnumerable<User>> SearchUser(string input);
    }
}