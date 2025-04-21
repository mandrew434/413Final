using Microsoft.EntityFrameworkCore;

namespace _413Final.Data
{
    public class EntertainmentAgencyDbContext : DbContext
    {
        // This method is used to configure the database context with the specified options.
        public EntertainmentAgencyDbContext(DbContextOptions<EntertainmentAgencyDbContext> options) : base(options)
        {
        }

        //Calls the tables we need for our instances
        public DbSet<Engagement> Engagements { get; set; }
        public DbSet<Entertainer> Entertainers { get; set; }
    }
}
