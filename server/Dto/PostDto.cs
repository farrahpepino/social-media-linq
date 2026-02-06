namespace server.Dto {
    public class PostDto {
        public string? Id { get; set; }
        public string? AuthorId { get; set; }
        public string? AuthorUsername { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt {get; set;}
    }
}