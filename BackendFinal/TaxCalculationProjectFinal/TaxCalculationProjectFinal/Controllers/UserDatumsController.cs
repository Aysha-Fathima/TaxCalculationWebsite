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
    public class UserDatumsController : ControllerBase
    {
        private readonly TaxCalculationProjectDbContext _context = new TaxCalculationProjectDbContext();

        //public UserDatumsController(TaxCalculationProjectDbContext context)
        //{
        //    _context = context;
        //}

        // GET: api/UserDatums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDatum>>> GetUserData()
        {
          if (_context.UserData == null)
          {
              return NotFound();
          }
            return await _context.UserData.ToListAsync();
        }

        // GET: api/UserDatums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDatum>> GetUserDatum(int id)
        {
          if (_context.UserData == null)
          {
              return NotFound();
          }
            var userDatum = await _context.UserData.FindAsync(id);

            if (userDatum == null)
            {
                return NotFound();
            }

            return userDatum;
        }

        // PUT: api/UserDatums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDatum(int id, UserDatum userDatum)
        {
            if (id != userDatum.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userDatum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDatumExists(id))
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

        // POST: api/UserDatums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserDatum>> PostUserDatum(UserDatum userDatum)
        {
          if (_context.UserData == null)
          {
              return Problem("Entity set 'TaxCalculationProjectDbContext.UserData'  is null.");
          }
            _context.UserData.Add(userDatum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserDatum", new { id = userDatum.UserId }, userDatum);
        }

        // DELETE: api/UserDatums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDatum(int id)
        {
            if (_context.UserData == null)
            {
                return NotFound();
            }
            var userDatum = await _context.UserData.FindAsync(id);
            if (userDatum == null)
            {
                return NotFound();
            }

            _context.UserData.Remove(userDatum);
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

            if (_context == null || _context.UserData == null)
            {
                return NotFound("User not found.");
            }

            // Find the user by UserName
            //var user = await _context.Users.FindAsync(loginRequest.UserName);
            var user = await _context.UserData.FirstOrDefaultAsync(u => u.Email == loginRequest.email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the password matches
            bool isPasswordValid = loginRequest.password == user.Upassword;



            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(true); // Login successful
        }


        [HttpGet("getIdByEmail")]
        public async Task<ActionResult<UserDatum>> GetUser(string email)
        {
            if (_context.UserData == null)
            {
                return NotFound();
            }
            //var taxiRideBooking = await _context.TaxiRideBookings.FindAsync(name);
            var userDetails = await _context.UserData
        .FirstOrDefaultAsync(detail => detail.Email == email);

            if (userDetails == null)
            {
                return NotFound();
            }

            return userDetails;
        }

        [HttpGet("UsersForCA/{id}")]
        public async Task<ActionResult<IEnumerable<UserDatum>>> GetDetailsForCA(int id)
        {
            if (_context.UserData == null)
            {
                return NotFound();
            }
            //var taxInfo = await _context.TaxInfos.FindAsync(id);
            var userInfo = await _context.UserData
            .Where(t => t.CaId == id)
            .ToListAsync();

            if (userInfo == null)
            {
                return NotFound();
            }

            return userInfo;
        }

        private bool UserDatumExists(int id)
        {
            return (_context.UserData?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
