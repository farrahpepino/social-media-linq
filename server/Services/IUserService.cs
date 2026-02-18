using server.Models;
using server.Dto;

namespace server.Services {
    public interface IUserService {
        Task<IEnumerable<User>> SearchUser(string input);
        Task<User> GetUser(string username);
        Task FollowUser(string followerId, string followeeId);
        Task UnfollowUser(string followerId, string followeeId);
        Task<bool> GetFollowStatus(string followerId, string followeeId);
        Task<IEnumerable<UserDto?>> GetFollowers(string userId);
        Task<IEnumerable<UserDto?>> GetFollowing(string userId);
    }
}