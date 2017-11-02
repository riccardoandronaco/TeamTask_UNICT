using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceAPI.Dal;
using System.Threading.Tasks;

namespace ServiceAPI
{
    [Route("api")]
    public class CoursesController:Controller
    {
        [HttpPut("courses")]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            using (var context = new StudentsDbContext()) { 
            context.Courses.Add(course);
                await context.SaveChangesAsync();
                    }
            return Ok();
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourse([FromQuery] int id)
        {
            using (var context = new StudentsDbContext())
            {
                var course = await context.Courses.FirstOrDefaultAsync(x => x.Id == id);
                if (course == null) return NotFound();
                return Ok(course);
            }
        }


        [HttpDelete("courses")]
        public async Task<IActionResult> DeleteCourse([FromQuery] int id)
        {
            using (var context = new StudentsDbContext())
            {
                var course = await context.Courses.FirstOrDefaultAsync(x => x.Id == id);
                if (course == null) return NotFound();
                context.Courses.Remove(course);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        public async Task<IActionResult> UpdateCourse([FromBody] Course course)
        {
            using (var context = new StudentsDbContext())
            {
                context.Courses.Update(course);
                await context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
