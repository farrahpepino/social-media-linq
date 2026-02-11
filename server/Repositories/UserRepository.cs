using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;

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
    }
}