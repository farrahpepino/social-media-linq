namespace server.Models {
    public class Post {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? AuthorId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt {get; set;} = DateTime.Now;
    }
}