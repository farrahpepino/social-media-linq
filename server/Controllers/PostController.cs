using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;  


namespace server.Controllers {

    [Authorize]
    [ApiController]
    [Route("controller")]
    public class PostController : ControllerBase {
        

    }
}