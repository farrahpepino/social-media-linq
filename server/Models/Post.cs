namespace server.Models {
    public class Post {
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        public string AuthorId { get; set; }
        public string Content { get; set; }
        public required DateTime CreatedAt {get; set;} = DateTime.Now;
    }
}