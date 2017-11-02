using Microsoft.EntityFrameworkCore;
using ServiceAPI.Dal;

namespace ServiceAPI.Dal
{
    public class StudentsDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Work> Works { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                //.UseMySql(@"Server=localhost;database=corso;uid=corso;pwd=unict;");
                //.UseMySql(@"Server=localhost;database=corso;uid=root;");
                //.UseMySql(@"Server=localhost;database=corsotest;uid=root;");
                .UseMySql(@"Server=localhost;database=TeamTask;uid=root;");


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Skip shadow types
                if (entityType.ClrType == null)
                    continue;

                entityType.Relational().TableName = entityType.ClrType.Name;
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
