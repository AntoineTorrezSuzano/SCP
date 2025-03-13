using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace SCP.Controllers;

[ApiController]
[Route("[controller]")]
public class CalendarController : ControllerBase
{
    private readonly ILogger<CalendarController> _logger;

    public CalendarController(ILogger<CalendarController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "getCalendar")]
    public async Task<IActionResult> GetCalendarAsJson()
    {
        try
        {
            string jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "json", "data.json");

            if (!System.IO.File.Exists(jsonFilePath))
            {
                _logger.LogError("File not found: {Path}", jsonFilePath);
                return NotFound("Calendar data file not found.");
            }

            var jsonContent = await System.IO.File.ReadAllTextAsync(jsonFilePath);
            var jsonDocument = JsonDocument.Parse(jsonContent);

            if (!jsonDocument.RootElement.TryGetProperty("value", out JsonElement events))
            {
                _logger.LogWarning("The JSON file does not contain the expected 'value' key.");
                return BadRequest("Invalid JSON structure. Expected 'value' key.");
            }

            return Ok(events);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving calendar data.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("nextEvent")]
    public async Task<IActionResult> GetNextEvent()
    {
        try
        {
            var result = await GetCalendarAsJson();
            if (result is OkObjectResult okResult && okResult.Value is JsonElement events && events.ValueKind == JsonValueKind.Array && events.GetArrayLength() > 0)
            {
                return Ok(events[0]); // Return the first event as "next event"
            }
            return NotFound("No upcoming events found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("nextEvent/subject")]
    public async Task<IActionResult> GetNextEventSubject()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult && okResult.Value is JsonElement eventData && eventData.TryGetProperty("subject", out JsonElement subject))
            {
                return Ok(new { subject = subject.GetString() });
            }
            return NotFound("No subject found for the next event.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event subject.");
            return StatusCode(500, "Internal server error.");
        }
    }
    [HttpGet("nextEvent/beginning")]
    public async Task<IActionResult> GetNextEventBeginning()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult &&
                okResult.Value is JsonElement eventData &&
                eventData.TryGetProperty("start", out JsonElement start) && start.TryGetProperty("dateTime", out JsonElement dateTime))
            {
                return Ok(new { beginning = dateTime.ToString() });
            }
            return NotFound("No beginning time found for the next event.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event beginning time.");
            return StatusCode(500, "Internal server error.");
        }
    }
    [HttpGet("nextEvent/beginning/YMDHM")]
    public async Task<IActionResult> GetNextEventBeginningYMDHM ()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult &&
                okResult.Value is JsonElement eventData &&
                eventData.TryGetProperty("start", out JsonElement start) && start.TryGetProperty("dateTime", out JsonElement dateTime))
            {
                string toFormat = dateTime.ToString();
                DateTime date = DateTime.Parse(toFormat);
                string formatted = date.ToString("yyyy-MM-dd, HH:mm");
                return Ok(new { beginning = formatted });
            }
            return NotFound("No beginning time found for the next event.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event beginning time.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("nextEvent/ending")]
    public async Task<IActionResult> GetNextEventEnding()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult &&
                okResult.Value is JsonElement eventData &&
                eventData.TryGetProperty("end", out JsonElement end) && end.TryGetProperty("dateTime", out JsonElement dateTime))
            {
                return Ok(new { ending = dateTime.GetString() });
            }
            return NotFound("No Ending time found for the next event.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event end.");
            return StatusCode(500, "Internal server error.");
        }
    }
    [HttpGet("nextEvent/ending/YMDHM")]
    public async Task<IActionResult> GetNextEventEndingYMDHM()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult &&
                okResult.Value is JsonElement eventData &&
                eventData.TryGetProperty("end", out JsonElement end) && end.TryGetProperty("dateTime", out JsonElement dateTime))
            {
                string toFormat = dateTime.ToString();
                DateTime date = DateTime.Parse(toFormat);
                string formatted = date.ToString("yyyy-MM-dd, HH:mm");
                return Ok(new { end = formatted });
            }
            return NotFound("No Ending time found for the next event.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event ending time.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("nextEvent/TimeLeftUntilNextEvent/HMS")]
    public async Task<IActionResult> GetTimeLeftUntilNextEvent()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult &&
                okResult.Value is JsonElement eventData &&
                eventData.TryGetProperty("start", out JsonElement start) && start.TryGetProperty("dateTime", out JsonElement dateTime))
            {
                string dateTimeString = dateTime.GetString();

                if(DateTime.TryParse(dateTimeString, out DateTime eventDateTime))
                {
                    TimeSpan remainingTime = eventDateTime - DateTime.Now;

                    if(remainingTime < TimeSpan.Zero)
                    {
                        remainingTime = TimeSpan.Zero;
                    }

                    string formattedRemainingTime = remainingTime.ToString(@"hh\:mm\:ss");

                    return Ok(new { timeLeft = formattedRemainingTime });
                }

                return BadRequest("Format de date invalide for the event");


                
             
            }
            return NotFound("No event found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event end.");
            return StatusCode(500, "Internal server error.");
        }
    }
    [HttpGet("nextEvent/TimeLeftUntilNextEventEnd/HMS")]
    public async Task<IActionResult> GetTimeLeftUntilNextEventEnd()
    {
        try
        {
            var result = await GetNextEvent();
            if (result is OkObjectResult okResult &&
                okResult.Value is JsonElement eventData &&
                eventData.TryGetProperty("end", out JsonElement end) && end.TryGetProperty("dateTime", out JsonElement dateTime))
            {
                string dateTimeString = dateTime.GetString();

                if (DateTime.TryParse(dateTimeString, out DateTime eventDateTime))
                {
                    TimeSpan remainingTime = eventDateTime - DateTime.Now;

                    if (remainingTime < TimeSpan.Zero)
                    {
                        remainingTime = TimeSpan.Zero;
                    }

                    string formattedRemainingTime = remainingTime.ToString(@"hh\:mm\:ss");

                    return Ok(new { timeLeft = formattedRemainingTime });
                }

                return BadRequest("Format de date invalide for the event");




            }
            return NotFound("No event found.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving the next event end.");
            return StatusCode(500, "Internal server error.");
        }
    }



}
