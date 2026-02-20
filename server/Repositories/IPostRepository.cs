using server.Models;
using server.Dto;

namespace server.Repositories {
    public interface IPostRepository {
        Task<Post> CreatePost(Post post);
        Task<bool> DeletePost(string id);
        Task<PostDto> GetPostById(string id);
        Task<IEnumerable<PostDto>> GetProfilePosts(string userId);
        Task<IEnumerable<PostDto>> GetFeed(string userId);
        Task<Comment> CreateComment(Comment comment);
        Task LikePost(string postId, string userId);
    }
}