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

            modelBuilder.Entity<Follower>()
                .HasKey(f => new { f.FollowerId, f.FolloweeId });

            modelBuilder.Entity<Follower>()
                .HasOne<User>() 
                .WithMany()
                .HasForeignKey(f => f.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Follower>()
                .HasOne<User>() 
                .WithMany()
                .HasForeignKey(f => f.FolloweeId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<User> Users { get; set; }  
        public DbSet<Post> Posts { get; set; } 
        public DbSet<Follower> Followers { get; set; } 
        public DbSet<Follower> Comments { get; set; } 
        public DbSet<Follower> Likes { get; set; } 
         
    }
}