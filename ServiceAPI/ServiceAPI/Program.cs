using Microsoft.AspNetCore.Hosting;
using ServiceAPI.Dal;
using System;
using System.Threading.Tasks;

namespace ServiceAPI
{
    class Program
    {
        static void Main(string[] args)
        {

            using (var context = new StudentsDbContext())
            {
                // Create database
                context.Database.EnsureCreated();

                Student a = new Student()
                {
                    Id=1,
                    Name = "riccardo",
                    Matricola= "O55000304",
                    Email="andronaco.riccardo@hotmail.com",
                    DateOfBirth = new DateTime(1994, 2, 28)
                };

                

                Student b = new Student()
                {
                    Id=2,
                    Name = "Marco",
                    Matricola = "O55000244",
                    Email = "marco.cognome@lamiamail.com",
                    DateOfBirth = new DateTime(1997, 2, 28)
                };

                

                Student c = new Student()
                {
                    Id=3,
                    Name = "Giuseppe",
                    Matricola = "O55000125",
                    Email = "giuseppe@testmail.com",
                    DateOfBirth = new DateTime(1998, 2, 28)
                };

                

                Project project1 = new Project()
                {
                    Id= 1,
                    Name = "Progetto 1",
                    Description = "Sviluppo di una App Android",
                    Requirements = "Conoscenza Java e Android Studio"
                };

                

                Project project2 = new Project()
                {
                    Id= 2,
                    Name = "Progetto 2",
                    Description = "Sviluppo di una App per iOS",
                    Requirements = "E' richiesta una minima conoscenza di Swift e XCode"
                };

                

                Work work1 = new Work()
                {
                    Id = 2,
                    Name = "Front End",
                    Status = "Waiting",
                    Allegati = "Curare l'aspetto frontend di modo che sia più User Friendly Possibile",
                    IdProject = 1,
                };

                

                Work work2 = new Work()
                {
                    Id = 23,
                    Name = "Errore di testing",
                    Status = "Assigned",
                    Allegati = "Verificare che l'istruzione sia corretta eseguendo dei testing mirati",
                    IdProject = 1,
                    Student_Id = 2
                };

                //Comment these lines after first startup

                context.Students.Add(a);
                context.Students.Add(b);
                context.Students.Add(c);
                context.Projects.Add(project1);
                context.Projects.Add(project2);
                context.Works.Add(work1);
                context.Works.Add(work2);

                context.SaveChanges();
            }



            var host = new WebHostBuilder()
                .UseEnvironment("Development")
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();

            Task restService = host.RunAsync();

            //System.Diagnostics.Process.Start("chrome.exe", "http://localhost/netcoreapp2.0/corsoing/");
            //System.Diagnostics.Process.Start("cmd", "/C start http://localhost/netcoreapp2.0/corsoing/");
            restService.Wait();
        }
    }
}
