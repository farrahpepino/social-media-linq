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

        }

        public async Task LoginUser(LoginDto user) { 

        }
    }
}