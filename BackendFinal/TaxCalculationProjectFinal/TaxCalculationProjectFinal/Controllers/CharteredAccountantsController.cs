using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxCalculationProjectFinal.Models;

namespace TaxCalculationProjectFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharteredAccountantsController : ControllerBase
    {
        private readonly TaxCalculationProjectDbContext _context = new TaxCalculationProjectDbContext();

        //public CharteredAccountantsController(TaxCalculationProjectDbContext context)
        //{
        //    _context = context;
        //}

        // GET: api/CharteredAccountants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CharteredAccountant>>> GetCharteredAccountants()
        {
          if (_context.CharteredAccountants == null)
          {
              return NotFound();
          }
            return await _context.CharteredAccountants.ToListAsync();
        }

        // GET: api/CharteredAccountants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CharteredAccountant>> GetCharteredAccountant(int id)
        {
          if (_context.CharteredAccountants == null)
          {
              return NotFound();
          }
            var charteredAccountant = await _context.CharteredAccountants.FindAsync(id);

            if (charteredAccountant == null)
            {
                return NotFound();
            }

            return charteredAccountant;
        }

        // PUT: api/CharteredAccountants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharteredAccountant(int id, CharteredAccountant charteredAccountant)
        {
            if (id != charteredAccountant.CaId)
            {
                return BadRequest();
            }

            _context.Entry(charteredAccountant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharteredAccountantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CharteredAccountants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CharteredAccountant>> PostCharteredAccountant(CharteredAccountant charteredAccountant)
        {
          if (_context.CharteredAccountants == null)
          {
              return Problem("Entity set 'TaxCalculationProjectDbContext.CharteredAccountants'  is null.");
          }
            _context.CharteredAccountants.Add(charteredAccountant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCharteredAccountant", new { id = charteredAccountant.CaId }, charteredAccountant);
        }

        // DELETE: api/CharteredAccountants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharteredAccountant(int id)
        {
            if (_context.CharteredAccountants == null)
            {
                return NotFound();
            }
            var charteredAccountant = await _context.CharteredAccountants.FindAsync(id);
            if (charteredAccountant == null)
            {
                return NotFound();
            }

            _context.CharteredAccountants.Remove(charteredAccountant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<ActionResult<bool>> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.email) || string.IsNullOrWhiteSpace(loginRequest.password))
            {
                return BadRequest("Invalid login request.");
            }

            if (_context == null || _context.CharteredAccountants == null)
            {
                return NotFound("User not found.");
            }

            // Find the user by UserName
            //var user = await _context.Users.FindAsync(loginRequest.UserName);
            var ca = await _context.CharteredAccountants.FirstOrDefaultAsync(u => u.Email == loginRequest.email);

            if (ca == null)
            {
                return NotFound("User not found.");
            }

            // Check if the password matches
            bool isPasswordValid = loginRequest.password == ca.Cpassword;



            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(true); // Login successful
        }

        [HttpGet("getIdByEmail")]
        public async Task<ActionResult<int>> GetUser(string email)
        {
            if (_context.CharteredAccountants == null)
            {
                return NotFound();
            }
            //var taxiRideBooking = await _context.TaxiRideBookings.FindAsync(name);
            var ca = await _context.CharteredAccountants
        .FirstOrDefaultAsync(detail => detail.Email == email);

            if (ca == null)
            {
                return NotFound();
            }

            return ca.CaId;
        }

        private bool CharteredAccountantExists(int id)
        {
            return (_context.CharteredAccountants?.Any(e => e.CaId == id)).GetValueOrDefault();
        }
    }
}
