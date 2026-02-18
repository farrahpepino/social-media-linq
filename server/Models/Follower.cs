namespace server.Models {
    public class Follower {
        public string FollowerId { get; set; }
        public string FolloweeId { get; set; }
        public DateTime CreatedAt {get; set;} = DateTime.Now;
    }
}