using server.Models;
using server.Dto;

namespace server.Repositories {
    public interface IUserRepository {
        Task<IEnumerable<User>> SearchUser(string input);
        Task<User> GetUser(string username);
        Task FollowUser(string followerId, string followeeId);
        Task UnfollowUser(string followerId, string followeeId);
        Task<Follower?> GetFollowStatus(string followerId, string followeeId);
        Task<IEnumerable<UserDto?>> GetFollowers(string userId);
        Task<IEnumerable<UserDto?>> GetFollowing(string userId);
    }
}