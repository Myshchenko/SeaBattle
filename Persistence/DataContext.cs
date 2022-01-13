using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Field> Fields { get; set; }

        public DbSet<Point> Points { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<GamePlayers> GamePlayers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Location>().HasKey(k => new { k.FieldId, k.PointId });

            builder.Entity<Location>()
                .HasOne(k => k.Field)
                .WithMany(s => s.Locations)
                .HasForeignKey(y => y.FieldId);

            builder.Entity<Location>()
                .HasOne(k => k.Point)
                .WithMany(s => s.Locations)
                .HasForeignKey(y => y.PointId);
        }
    }
}
