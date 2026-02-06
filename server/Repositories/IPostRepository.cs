using server.Models;

namespace server.Repositories {
    public interface IPostRepository {
        Task<Post> CreatePost(Post post);
        Task<bool> DeletePost(string id);
        Task<Post> GetPostById(string id);
        Task<IEnumerable<Post>> GetProfilePosts(string userId);
        Task<IEnumerable<Post>> GetFeed();
    }
}