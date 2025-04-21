using _413Final.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _413Final.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainmentAgencyController : ControllerBase
    {
        private EntertainmentAgencyDbContext _entertainmentContext;

        public EntertainmentAgencyController(EntertainmentAgencyDbContext temp)
        {
            _entertainmentContext = temp;
        }

        // This controller action joins the Entertainers and Engagement tables together to get all the information needed.  
        [HttpGet("EntertainersBookingSummary")]
        public IActionResult GetEntertainersBookingSummary()
        {
            var result = _entertainmentContext.Entertainers
                .GroupJoin(_entertainmentContext.Engagements,
                           entertainer => entertainer.EntertainerID,
                           engagement => engagement.EntertainerID,
                           (entertainer, engagements) => new
                           {
                               EntertainerID = entertainer.EntertainerID,
                               entertainer.EntStageName,
                               BookingCount = engagements.Count(),
                               LastBookedDate = engagements.Max(e => e.StartDate)
                           })
                .ToList();

            return Ok(result);
        }


        //Entertainer Details
        // This controller action returns the details of a specific entertainer based on the EntertainerID.
        [HttpGet("EntertainerDetails/{id}")]
        public IActionResult GetEntertainer(int id)
        {
            var ent = _entertainmentContext.Entertainers.Find(id);
            if (ent == null) return NotFound();
            return Ok(ent);
        }

        //Create new entertainer
        // This controller action adds a new entertainer to the database.
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer ent)
        {
            // Check if the entertainer object is null
            if (ent == null) return BadRequest();

            _entertainmentContext.Entertainers.Add(ent);
            _entertainmentContext.SaveChanges();

            // returns 201 with a Location: header pointing to GET api/.../{id}
            return CreatedAtAction(
                nameof(GetEntertainer),
                new { id = ent.EntertainerID },
                ent
            );
        }

        //Update entertainer
        // This controller action updates the details of an existing entertainer.
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            // Check if the updated entertainer object is null
            if (updated == null || id != updated.EntertainerID)
                return BadRequest();

            var existing = _entertainmentContext.Entertainers.Find(id);
            if (existing == null) return NotFound();

            // These are the properties that can be updated
            existing.EntStageName = updated.EntStageName;
            existing.EntSSN = updated.EntSSN;
            existing.EntStreetAddress = updated.EntStreetAddress;
            existing.EntCity = updated.EntCity;
            existing.EntState = updated.EntState;
            existing.EntZipCode = updated.EntZipCode;
            existing.EntPhoneNumber = updated.EntPhoneNumber;
            existing.EntWebPage = updated.EntWebPage;
            existing.EntEMailAddress = updated.EntEMailAddress;
            existing.DateEntered = updated.DateEntered;

            _entertainmentContext.SaveChanges();
            return Ok(updated); // 204
        }

        // DELETE /EntertainmentAgency/DeleteEntertainer/{id}
        // This controller action deletes an entertainer from the database.
        [HttpDelete("DeleteEntertainer/{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            // Look up the entertainer
            var existing = _entertainmentContext.Entertainers.Find(id);
            if (existing == null)
                return NotFound();          // 404 if not found

            // Remove and save
            _entertainmentContext.Entertainers.Remove(existing);
            _entertainmentContext.SaveChanges();

            return NoContent();             // 204 on success
        }



    }
}
