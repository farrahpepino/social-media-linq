using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;  
using server.Models;
using server.Services;
using server.Dto;

namespace server.Controllers{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase {

        private readonly IUserService _service;

        public UserController (IUserService service) {
            _service = service;
        }

        [Authorize]
        [HttpGet("search/{input}")]
        public async Task<IActionResult> SearchUser(string input) {

            var result = await _service.SearchUser(input);

            if (!result.Any()) {
                return NotFound();
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUser(string username) {

            var result = await _service.GetUser(username);

            if (result == null) {
                return NotFound();
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("follow/{followeeId}")]
        public async Task<IActionResult> FollowUser(string followeeId)
        {
            var followerId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            await _service.FollowUser(followerId, followeeId);

            return Ok();
        }

        [Authorize]
        [HttpDelete("unfollow/{followeeId}")]
        public async Task<IActionResult> UnfollowUser(string followeeId)
        {
            var followerId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            await _service.UnfollowUser(followerId, followeeId);

            return Ok();
        }

        [Authorize]
        [HttpGet("follow-status/{followeeId}")]
        public async Task<IActionResult> GetFollowStatus(string followeeId)
        {
            var followerId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            var res = await _service.GetFollowStatus(followerId, followeeId);

            return Ok(res);
        }

        [Authorize]
        [HttpGet("followers/{userId}")]
        public async Task<IActionResult> GetFollowers(string userId)
        {
            var res = await _service.GetFollowers(userId);

            if (res==null){
                return NotFound();
            }

            return Ok(res);
        }

        [Authorize]
        [HttpGet("following/{userId}")]
        public async Task<IActionResult> GetFollowing(string userId)
        {
            var res = await _service.GetFollowing(userId);

            if (res==null){
                return NotFound();
            }
            
            return Ok(res);
        }

    }

}