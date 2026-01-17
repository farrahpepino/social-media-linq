using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data {
    public class AppDbContext : DbContext {
    
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}
        

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Id)
                .IsUnique();
        }

        public DbSet<User> Users { get; set; }  
        public DbSet<Post> Posts { get; set; } 

         
    }
}