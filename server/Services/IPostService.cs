using server.Models;
using server.Dto;

namespace server.Services {
    public interface IPostService {
        Task<Post> CreatePost(Post post);
        Task<bool> DeletePost(string id);
        Task<PostDto> GetPostById(string id);
        Task<IEnumerable<PostDto>> GetProfilePosts(string userId);
        Task<IEnumerable<PostDto>> GetFeed(string userId);
        Task<Comment> CommentPost(Comment comment);
        Task<bool> LikePost(Like Like);
    }
}