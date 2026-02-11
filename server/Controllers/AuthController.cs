using Microsoft.AspNetCore.Authorization;  
using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using server.Dto;
using System.IdentityModel.Tokens.Jwt;

namespace server.Controllers {
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        
        private readonly IAuthService _service;

        public AuthController (IAuthService service) {
            _service = service;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto user) {

            var token = await _service.RegisterUser(user);

            if (token!=null){
                Response.Cookies.Append("token", token, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true, // true in production
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.Now.AddDays(7)
                    });

                return Ok(new { message = "Registered successfully" });
            }

            return BadRequest("User already exists");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDto user) {
            var token = await _service.LoginUser(user);

            if (token != null)
            {
                Response.Cookies.Append("token", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true, // true in production
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.Now.AddDays(7)
                });

                return Ok(new { message = "Logged in successfully" });
            }

            return Unauthorized("Invalid credentials");
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout(){
            Response.Cookies.Delete("token"); 
            return Ok(new { message = "Logged out" });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            if (!Request.Cookies.TryGetValue("token", out var token))
                return Unauthorized("No token");

            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var id = jwtToken.Claims.First(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub).Value;
            var username = jwtToken.Claims.First(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.UniqueName).Value;
            var email = jwtToken.Claims.First(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email).Value;

            return Ok(new { id, username, email });
        }
    }
}