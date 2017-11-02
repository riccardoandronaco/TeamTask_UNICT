using Microsoft.AspNetCore.Mvc;
using ServiceAPI.Dal;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ServiceAPI
{
    [Route("api")]
    public class WorksController : Controller
    {

        [HttpGet("works")]
        public async Task<IActionResult> GetWorkfromProjectID([FromQuery]int id)
        {
            using (var context = new StudentsDbContext())
            {
                var Work = await context.Works.Where(x => x.IdProject == id).ToListAsync();
                if (Work == null) return NotFound();
                return Ok(Work);
            }
        }

        /*[HttpGet("works")]
        public async Task<IActionResult> GetWorks()
        {
            try
            {
                

                using (var context = new StudentsDbContext())
                {
                    return Ok(await context.Works.ToListAsync());
                }
            }
            finally
            {

            }
        }
        */

        [HttpPut("works")]
        public async Task<IActionResult> CreateWork([FromBody]Work Work)
        {
            using (var context = new StudentsDbContext())
            {
                context.Works.Add(Work);

                await context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpPost("works")]
        public async Task<IActionResult> UpdateWork([FromBody]Work Work)
        {
            using (var context = new StudentsDbContext())
            {
                context.Works.Update(Work);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("works")]
        public async Task<IActionResult> DeleteWork([FromQuery]int id)
        {
            using (var context = new StudentsDbContext())
            {
                var Work = await context.Works.FirstOrDefaultAsync(x => x.Id == id);
                context.Works.Remove(Work);
                await context.SaveChangesAsync();
                return Ok();


            }
        }
    }
}
