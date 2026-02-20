namespace server.Models {
    public class CommentDto {
        public string Id { get; set; }
        public string PostId { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt {get; set;}
    }
}