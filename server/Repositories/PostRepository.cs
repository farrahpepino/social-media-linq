using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Repositories {
    public class PostRepository: IPostRepository {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context){
            _context = context;
        }

        public async Task<Post> CreatePost (Post post) {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<bool> DeletePost (string id) {
            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
            if (post == null)
                return false;

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return true;

        }
        
    }
}