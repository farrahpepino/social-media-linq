using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Dto;

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

        public async Task<PostDto> GetPostById(string id){
            return await _context.Posts
            .Join(
                _context.Users,
                p => p.AuthorId,
                u => u.Id,
                (p, u) => new PostDto{
                    Id = p.Id,
                    AuthorId = p.AuthorId,
                    AuthorUsername = u.Username,
                    Content = p.Content,
                    CreatedAt = p.CreatedAt
                }
            )
            .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<PostDto>> GetProfilePosts(string userId){
            return await _context.Posts
                .Where(p => p.AuthorId == userId)
                .Join(
                _context.Users,
                p => p.AuthorId,
                u => u.Id,
                (p, u) => new PostDto{
                    Id = p.Id,
                    AuthorId = p.AuthorId,
                    AuthorUsername = u.Username,
                    Content = p.Content,
                    CreatedAt = p.CreatedAt
                }
                )
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<PostDto>> GetFeed(string userId){

            var followedIds = await _context.Followers
                            .Where(f => f.FollowerId == userId)
                            .Select(f => f.FolloweeId)
                            .ToListAsync();
            
            followedIds.Add(userId);

            var feed = await _context.Posts
                    .Where(p => followedIds.Contains(p.AuthorId))
                    .Join(
                        _context.Users,
                        p => p.AuthorId,
                        u => u.Id,
                        (p, u) => new PostDto
                        {
                            Id = p.Id,
                            AuthorId = p.AuthorId,
                            AuthorUsername = u.Username,
                            Content = p.Content,
                            CreatedAt = p.CreatedAt
                        }
                    )
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();
                    

            return feed;

        }

        public async Task<Comment> CommentPost (Comment comment) {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<bool> LikePost (Like like) {
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CommentDto>> GetComments(string postId){
            return await _context.Comments
                .Where(c => c.PostId == postId)
                .Join(
                _context.Users,
                c => c.UserId,
                u => u.Id,
                (c, u) => new CommentDto{
                    Id = c.Id,
                    PostId = c.PostId,
                    UserId = c.UserId,
                    Username = u.Username,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt
                }
                )
                .ToListAsync();
        }

         public async Task<IEnumerable<LikeDto>> GetLikes(string postId){
            return await _context.Likes
                .Where(l => l.PostId == postId)
                .Join(
                _context.Users,
                l => l.UserId,
                u => u.Id,
                (l, u) => new LikeDto{
                    Id = l.Id,
                    PostId = l.PostId,
                    UserId = l.UserId,
                    Username = u.Username,
                    CreatedAt = l.CreatedAt
                }
                )
                .ToListAsync();
        }

        public async Task<bool> DeleteComment (string id) {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
                return false;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<bool> DeleteLike (string id) {
            var like = await _context.Likes.FirstOrDefaultAsync(l => l.Id == id);
            if (like == null)
                return false;

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}