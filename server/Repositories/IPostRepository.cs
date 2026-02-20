using server.Models;
using server.Dto;

namespace server.Repositories {
    public interface IPostRepository {
        Task<Post> CreatePost(Post post);
        Task<bool> DeletePost(string id);
        Task<PostDto> GetPostById(string id);
        Task<IEnumerable<PostDto>> GetProfilePosts(string userId);
        Task<IEnumerable<PostDto>> GetFeed(string userId);
        Task<Comment> CommentPost(Comment comment);
        Task<bool> LikePost(Like Like);
        Task<IEnumerable<CommentDto>> GetComments(string postId);
        Task<IEnumerable<LikeDto>> GetLikes(string postId);
        Task<bool> DeleteComment(string id);
        Task<bool> DeleteLike(string id);
    }
}