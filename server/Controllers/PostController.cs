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

    }
}