using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;

namespace server.Repositories {
    public class UserRepository: IUserRepository {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context){
            _context = context;
        }

        public async Task<IEnumerable<User>> SearchUser(string input){
            var result = await _context.Users  
                        .Where(u => u.Username.Contains(input))
                        .Take(5)
                        .ToListAsync();

            return result;
        }

        public async Task<User?> GetUser(string username){
            return await _context.Users  
                        .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task FollowUser(string followerId, string followeeId){
            var newFollow = new Follower {
                    FollowerId = followerId,
                    FolloweeId = followeeId,
                    CreatedAt = DateTime.Now
                };

            _context.Followers.Add(newFollow);
            await _context.SaveChangesAsync();
        }

        public async Task UnfollowUser(string followerId, string followeeId){
            var existingFollow = await _context.Followers
                                .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FolloweeId == followeeId);

            _context.Followers.Remove(existingFollow);
            await _context.SaveChangesAsync();
        }

        public async Task<Follower?> GetFollowStatus(string followerId, string followeeId){
            var result = await _context.Followers
                     .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FolloweeId == followeeId);

            return result;
        }

        public async Task<IEnumerable<UserDto?>> GetFollowing(string userId){
            var result = await _context.Followers
                     .Where(f => f.FollowerId == userId)
                     .Join(
                        _context.Users,                      
                        f => f.FolloweeId,                  
                        u => u.Id,                          
                        (f, u) => new UserDto  
                        {
                            Id = u.Id,
                            Username = u.Username,
                            Email = u.Email
                        }                        
                    )
                    .ToListAsync();

            return result;
        }

         public async Task<IEnumerable<UserDto?>> GetFollowers(string userId){
            var result = await _context.Followers
                     .Where(f => f.FolloweeId == userId)
                     .Join(
                        _context.Users,                      
                        f => f.FollowerId,                  
                        u => u.Id,                          
                        (f, u) => new UserDto  
                        {
                            Id = u.Id,
                            Username = u.Username,
                            Email = u.Email
                        }                           
                    )
                    .ToListAsync();
                     
                     ;
            return result;
        }

    }
}