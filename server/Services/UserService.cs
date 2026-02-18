using server.Models;
using server.Repositories;
using server.Dto;

namespace server.Services {
    public class UserService: IUserService {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository){
            _repository = repository;
        }

        public async Task<IEnumerable<User>> SearchUser(string input){
            return await _repository.SearchUser(input);
        }

        public async Task<User> GetUser(string username){
            var result = await _repository.GetUser(username);
            return result;
        }

        public async Task FollowUser(string followerId, string followeeId){
            await _repository.FollowUser(followerId, followeeId);
        }

        public async Task UnfollowUser(string followerId, string followeeId){
            await _repository.UnfollowUser(followerId, followeeId);
        }

        public async Task<bool> GetFollowStatus(string followerId, string followeeId){
            var result = await _repository.GetFollowStatus(followerId, followeeId);

            if (result==null){
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<UserDto?>> GetFollowing(string userId){
            return await _repository.GetFollowing(userId);
        }

         public async Task<IEnumerable<UserDto?>> GetFollowers(string userId){
            return await _repository.GetFollowers(userId);
        }
    }
}