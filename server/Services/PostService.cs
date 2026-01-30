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
    }
}