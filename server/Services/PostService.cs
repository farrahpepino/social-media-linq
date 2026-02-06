using server.Models;
using server.Repositories;
namespace server.Services {
    public class PostService: IPostService {
        private readonly IPostRepository _repository;

        public PostService (IPostRepository repository) {
            _repository = repository;
        }

        public async Task<Post> CreatePost (Post post) {
            return await _repository.CreatePost(post);
        }

        public async Task<bool> DeletePost (string id) {
            return await _repository.DeletePost(id);
        }

        public Task<Post> GetPostById(string id) {
            return await _repository.GetPostById(id);
        }

        public Task<IEnumerable<Post>> GetProfilePosts(string userId){
            return await _repository.GetProfilePosts(userId);
        }

        public Task<IEnumerable<Post>> GetFeed() {
            return await _repository.GetFeed();
        }
    }
}