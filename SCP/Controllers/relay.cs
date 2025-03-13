using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace SCP.Controllers;
public class TimerRequest
{
    public int Seconds { get; set; }
}

[ApiController]
[Route("[controller]")]
public class RelayController : ControllerBase
{


    private static readonly HttpClient client = new HttpClient();
    private readonly ILogger<RelayController> _logger;
    public RelayController(ILogger<RelayController> logger)
    {
        _logger = logger;
    }

    private string getUrl()
    {
        return "http://157.26.121.93";
    }

    [HttpGet("Toggle", Name = "toggleRelay")]
    public async Task<IActionResult> Toggle()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync(getUrl() + "/relay/0?turn=toggle");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            return Ok(responseBody);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            _logger.LogError(e, "Error while the toggle request");
            return StatusCode(500, $"Error during the request: {e.Message}");
        }

    }
    [HttpGet("TurnOn", Name = "TurnOnRelay")]
    public async Task<IActionResult> TurnOn()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync(getUrl() + "/relay/0?turn=on");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            return Ok(responseBody);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            _logger.LogError(e, "Error while the turn on request");
            return StatusCode(500, $"Error during the request: {e.Message}");
        }

    }
    [HttpGet("TurnOff", Name = "TurnOffRelay")]
    public async Task<IActionResult> TurnOff()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync(getUrl() + "/relay/0?turn=off");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            return Ok(responseBody);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            _logger.LogError(e, "Error while the turn off request");
            return StatusCode(500, $"Error during the request: {e.Message}");
        }

    }
    [HttpGet("getStatus", Name = "GetRelayStatus")]

    public async Task<IActionResult> GetStatus()
    {
        try
        {
                string requestUrl = $"{getUrl()}/rpc/Shelly.GetStatus";
                HttpResponseMessage response = await client.GetAsync(requestUrl);
                response.EnsureSuccessStatusCode();

                string json = await response.Content.ReadAsStringAsync();
                using JsonDocument doc = JsonDocument.Parse(json);
                JsonElement data = doc.RootElement.Clone();
                JsonElement status = data.GetProperty("switch:0").GetProperty("output");
                bool outputStatus = status.GetBoolean();

            return Ok(outputStatus);
        }
        catch (HttpRequestException e)
        {
            _logger.LogError(e, "Erreur lors de l'appel de getStatus sur {Url}", getUrl());
            return StatusCode(StatusCodes.Status500InternalServerError, "Erreur lors de la récupération du status");
        }
    }

    [HttpPost("Timer", Name = "setTimer")]
    public async Task<IActionResult> SetTimer([FromBody] TimerRequest request)
    {
        try
        {
            if (request.Seconds <= 0)
            {
                return BadRequest("The duration in seconds have to be superior to 0");
            }
            _ = Task.Run(async () =>
            {
                try
                {
                    await Task.Delay(request.Seconds * 1000);

                    HttpResponseMessage response = await client.GetAsync(getUrl() + "/relay/0?turn=toggle");
                    
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while the timer set request");
                }
            });

            return Ok($"The timer have been set to {request.Seconds} !");
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            _logger.LogError(e, "Error while the implement request");
            return StatusCode(500, $"Error during the request: {e.Message}");
        }
    }
}
