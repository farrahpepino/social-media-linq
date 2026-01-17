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
            var result = await _service.RegisterUser(user);

            if (result!=null){
                return Ok(result);
            }

            return BadRequest("You already have an account with this email or username.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDto user) {
            var result = await _service.LoginUser(user);

            if(result==null) {
                return BadRequest("Incorrect password or email.");
            }

            return Ok(result);

        }

    }
}