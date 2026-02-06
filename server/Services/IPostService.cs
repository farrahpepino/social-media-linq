using server.Models;

namespace server.Services {
    public interface IPostService {
        Task<Post> CreatePost(Post post);
        Task<bool> DeletePost(string id);
        Task<Post> GetPostById(string id);
        Task<IEnumerable<Post>> GetProfilePosts(string userId);
        Task<IEnumerable<Post>> GetFeed();
    }
}