using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using server.Dto;

namespace server.Controllers {

    [ApiController]
    [Route("[controller]")]

    public class AuthController : ControllerBase {
        
        private IAuthService _service;

        public AuthController (IAuthService service) {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user) {
            await _service.RegisterUser(user);

            // fix this

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDto user) {
            var exists = await _service.LoginUser(user);

            if(!exists) {
                return BadRequest("Incorrect password or email.");
            }

            return Ok(user);

        }

    }
}