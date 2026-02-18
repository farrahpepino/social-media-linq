using server.Models;
using server.Repositories;
using server.Dto;

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

        public async Task<PostDto> GetPostById(string id) {
            return await _repository.GetPostById(id);
        }

        public async Task<IEnumerable<PostDto>> GetProfilePosts(string userId){
            return await _repository.GetProfilePosts(userId);
        }

        public async Task<IEnumerable<PostDto>> GetFeed(string userId) {
            return await _repository.GetFeed(userId);
        }
    }
}