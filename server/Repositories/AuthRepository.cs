using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
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
            
            // fix this. should return tokens
            // if (existingUser != null) {
            //     return; 
            // }

            _context.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> LoginUser(LoginDto user) { 
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            
            if (existingUser == null){
                return false;
            }

            return PasswordAuthenticator.VerifyPassword(user.Password, existingUser.Password);
        }
    }
}