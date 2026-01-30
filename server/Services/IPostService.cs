using server.Models;

namespace server.Services {
    public interface IPostService {
        Task<Post> CreatePost(Post post);
        Task<bool> DeletePost(string id);
    }
}