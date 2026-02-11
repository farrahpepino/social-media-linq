using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;  
using server.Models;
using server.Services;

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



    }

}