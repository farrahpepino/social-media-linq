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

        public async Task<Comment> CommentPost (Comment comment) {
            return await _repository.CommentPost(comment);
        }

        public async Task<bool> LikePost (Like like) {
            return await _repository.LikePost(like);
        }

        public async Task<IEnumerable<CommentDto>> GetComments(string postId){
            return await _repository.GetComments(postId);
        }

        public async Task<IEnumerable<LikeDto>> GetLikes(string postId){
            return await _repository.GetLikes(postId);
        }

        public async Task<bool> DeleteComment (string id) {
            return await _repository.DeleteComment(id);
        }

        public async Task<bool> DeleteLike (string id) {
            return await _repository.DeleteLike(id);
        }

    }
}