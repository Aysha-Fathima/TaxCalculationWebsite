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
    public class TableInfoesController : ControllerBase
    {
        private readonly TaxCalculationProjectDbContext _context = new TaxCalculationProjectDbContext();

        //public TableInfoesController(TaxCalculationProjectDbContext context)
        //{
        //    _context = context;
        //}

        // GET: api/TableInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableInfo>>> GetTableInfos()
        {
          if (_context.TableInfos == null)
          {
              return NotFound();
          }
            return await _context.TableInfos.ToListAsync();
        }

        // GET: api/TableInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TableInfo>> GetTableInfo(int id)
        {
          if (_context.TableInfos == null)
          {
              return NotFound();
          }
            var tableInfo = await _context.TableInfos.FindAsync(id);

            if (tableInfo == null)
            {
                return NotFound();
            }

            return tableInfo;
        }

        // PUT: api/TableInfoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTableInfo(int id, TableInfo tableInfo)
        {
            if (id != tableInfo.TaxId)
            {
                return BadRequest();
            }

            _context.Entry(tableInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableInfoExists(id))
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

        // POST: api/TableInfoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TableInfo>> PostTableInfo(TableInfo tableInfo)
        {
          if (_context.TableInfos == null)
          {
              return Problem("Entity set 'TaxCalculationProjectDbContext.TableInfos'  is null.");
          }
            _context.TableInfos.Add(tableInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTableInfo", new { id = tableInfo.TaxId }, tableInfo);
        }

        // DELETE: api/TableInfoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTableInfo(int id)
        {
            if (_context.TableInfos == null)
            {
                return NotFound();
            }
            var tableInfo = await _context.TableInfos.FindAsync(id);
            if (tableInfo == null)
            {
                return NotFound();
            }

            _context.TableInfos.Remove(tableInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("userdetails/{id}")]
        public async Task<ActionResult<IEnumerable<TableInfo>>> GetDetailsForCA(int id)
        {
            if (_context.TableInfos == null)
            {
                return NotFound();
            }
            //var taxInfo = await _context.TaxInfos.FindAsync(id);
            var taxInfo = await _context.TableInfos
            .Where(t => t.UserId == id)
            .ToListAsync();

            if (taxInfo == null)
            {
                return NotFound();
            }

            return taxInfo;
        }

        [HttpGet("AllUsersForCA/{id}")]
        public async Task<ActionResult<IEnumerable<TableInfo>>> GetUsersForCA(int id)
        {
            if (_context.TableInfos == null)
            {
                return NotFound();
            }
            //var taxInfo = await _context.TaxInfos.FindAsync(id);
            var taxInfo = await _context.TableInfos
            .Where(t => t.CaId == id)
            .ToListAsync();

            if (taxInfo == null)
            {
                return NotFound();
            }

            return taxInfo;
        }

        private bool TableInfoExists(int id)
        {
            return (_context.TableInfos?.Any(e => e.TaxId == id)).GetValueOrDefault();
        }
    }
}
