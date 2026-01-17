using System;

namespace server.Models
{
    public class User {
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public required DateTime CreatedAt {get; set;} = DateTime.Now;
    }
    
}