using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Helpers;

namespace server.Repositories {
    public class AuthRepository : IAuthRepository {
        private readonly AppDbContext _context;

        public AuthRepository(AppDbContext context){
            _context = context;
        }

        public async Task RegisterUser(User user) {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null) {
                return;
            }
            user.Password = PasswordAuthenticator.HashPassword(user.Password);
            _context.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task LoginUser(LoginDto user) { 
            var existingUser = _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser == null){
                return false;
            }

            return PasswordAuthenticator.VerifyPassword(user.Password, existingUser.Password);
        }
    }
}