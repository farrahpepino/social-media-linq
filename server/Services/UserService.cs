using server.Models;
using server.Repositories;

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
    }
}