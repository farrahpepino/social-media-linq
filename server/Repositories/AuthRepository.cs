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

        public async Task<UserDto?> RegisterUser(User user) {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            
            if (existingUser != null) {
                return null; 
            }

            _context.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto{
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }

        public async Task<UserDto?> LoginUser(LoginDto user) { 
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        
            if (PasswordAuthenticator.VerifyPassword(user.Password, existingUser.Password)) {
                return new UserDto {
                    Id = existingUser.Id,
                    Username = existingUser.Username,
                    Email = existingUser.Email
                };
            }

            return null;
        }
    }
}