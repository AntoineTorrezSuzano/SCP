using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;


namespace SCP.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplateController : ControllerBase
{
    private static readonly HttpClient client = new HttpClient();
    private readonly ILogger<TemplateController> _logger;
    public  TemplateController(ILogger<TemplateController> logger)
    {
        _logger = logger;
    }


    [HttpGet(Name = "helloWorld")]
    public async Task<IActionResult> template() 
    {
        try
        {
            return Ok("This is a template for creating other endpoint !");
        } catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            _logger.LogError(e, "Error during the template");
            return StatusCode(500, $"Error during the request: {e.Message}");
        }
       
    }



}
