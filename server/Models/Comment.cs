namespace server.Models {
    public class Comment {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string PostId { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt {get; set;} = DateTime.Now;
    }
}