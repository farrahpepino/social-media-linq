using Microsoft.AspNetCore.Authorization;  
using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using server.Dto;
using System.IdentityModel.Tokens.Jwt;

namespace server.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        
        private IAuthService _service;

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
                        Secure = false, // true in production
                        SameSite = SameSiteMode.Strict,
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
                    Secure = false, // true in production
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.Now.AddDays(7)
                });

                return Ok(new { message = "Logged in successfully" });
            }

            return Unauthorized("Invalid credentials");
        }


        [HttpPost("logout")]
        [Authorize] 
        public IActionResult Logout(){
            Response.Cookies.Delete("token"); 
            return Ok(new { message = "Logged out" });
        }

        [HttpGet("profile")]
        [Authorize]
        public IActionResult Profile()
        {
            if (!Request.Cookies.TryGetValue("token", out var token))
                return Unauthorized("No token");

            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userId = jwtToken.Claims.First(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub).Value;
            var username = jwtToken.Claims.First(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.UniqueName).Value;
            var email = jwtToken.Claims.First(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email).Value;

            return Ok(new { userId, username, email });
        }
    }
}