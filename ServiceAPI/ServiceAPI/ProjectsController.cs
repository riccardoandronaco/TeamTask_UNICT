using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceAPI.Dal;
using System.Threading.Tasks;

namespace ServiceAPI
{
    [Route("api")]
    public class ProjectsController: Controller
    {
        [HttpPut("projects")]
        public async Task<IActionResult> CreateProject([FromBody] Project project)
        {
            using (var context = new StudentsDbContext()) { 
            context.Projects.Add(project);
                await context.SaveChangesAsync();
                    }
            return Ok();
        }

        [HttpGet("project")]
        public async Task<IActionResult> GetProject([FromQuery] int id)
        {
            using (var context = new StudentsDbContext())
            {
                var Project = await context.Projects.FirstOrDefaultAsync(x => x.Id == id);
                if (Project == null) return NotFound();
                return Ok(Project);
            }
        }

        [HttpGet("projects")]
        public async Task<IActionResult> GetProjects()
        {
            try
            {


                using (var context = new StudentsDbContext())
                {
                    return Ok(await context.Projects.ToListAsync());
                }
            }
            finally
            {

            }
        }

        [HttpDelete("projects")]
        public async Task<IActionResult> DeleteProject([FromQuery] int id)
        {
            using (var context = new StudentsDbContext())
            {
                var Project = await context.Projects.FirstOrDefaultAsync(x => x.Id == id);
                if (Project == null) return NotFound();
                context.Projects.Remove(Project);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPost("project")]
        public async Task<IActionResult> UpdateProject([FromBody] Project Project)
        {
            using (var context = new StudentsDbContext())
            {
                context.Projects.Update(Project);
                await context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
