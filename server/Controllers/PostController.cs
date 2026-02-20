using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;  
using server.Models;
using server.Services;

namespace server.Controllers {

    [Authorize]
    [ApiController]
    [Route("[controller]")]

    public class PostController : ControllerBase {
        private readonly IPostService _service;

        public PostController (IPostService service) {
            _service = service;
        }
        
        [HttpPost()]
        [Authorize] 
        public async Task<IActionResult> CreatePost([FromBody] Post post) {
            var res = await _service.CreatePost(post);

            if (res == null) {
                return BadRequest("Unable to post.");
            }

            return Ok(res);
        }

        [HttpDelete("{id}")]
        [Authorize] 
        public async Task<IActionResult> DeletePost(string id) {
            var res = await _service.DeletePost(id);

            if (res == false) {
                return BadRequest("Unable to delete post.");
            }

            return Ok();
        }

        [Authorize] 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(string id) {
            var res = await _service.GetPostById(id);

            if(res==null){
                return NotFound();
            }

            return Ok(res);
        }

        [Authorize]
        [HttpGet("get-profile-posts/{userId}")]
        public async Task<IActionResult> GetProfilePosts(string userId){
            var res = await _service.GetProfilePosts(userId);

            if(res==null){
                return NotFound();
            }

            return Ok(res);
        }

        [Authorize]
        [HttpGet("get-feed")]
        public async Task<IActionResult> GetFeed(){
            
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var res = await _service.GetFeed(userId);

            if(res==null){
                return NotFound();
            }

            return Ok(res);

        }

        [HttpPost("comment")]
        [Authorize] 
        public async Task<IActionResult> CommentPost([FromBody] Comment comment) {
            var res = await _service.CommentPost(comment);

            if (res == null) {
                return BadRequest("Unable to comment.");
            }

            return Ok(res);
        }

        [HttpPost("like")]
        [Authorize] 
        public async Task<IActionResult> LikePost([FromBody] Like like) {
            var res = await _service.LikePost(like);

            if (res == null) {
                return BadRequest("Unable to like post.");
            }

            return Ok(res);
        }

        [HttpGet("comments/{postId}")]
        public async Task<IActionResult> GetComments(string postId){
            var res = await _service.GetComments(postId);

            if(res==null){
                return NotFound();
            }

            return Ok(res);
        }

        [HttpGet("likes/{postId}")]
        public async Task<IActionResult> GetLikes(string postId){
            var res = await _service.GetLikes(postId);

            if(res==null){
                return NotFound();
            }
            return Ok(res);
        }

        [HttpDelete("comment/{id}")]
        [Authorize] 
        public async Task<IActionResult> DeleteComment(string id) {
            var res = await _service.DeleteComment(id);

            if (res == false) {
                return BadRequest("Unable to delete a comment.");
            }

            return Ok();
        }

        [HttpDelete("like/{id}")]
        [Authorize] 
        public async Task<IActionResult> DeleteLike(string id) {
            var res = await _service.DeleteLike(id);

            if (res == false) {
                return BadRequest("Unable to unlike post.");
            }

            return Ok();
        }

        
    }
}