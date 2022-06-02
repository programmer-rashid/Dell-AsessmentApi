using Dell_Asessment.Model;
using Microsoft.EntityFrameworkCore;

namespace Dell_Asessment.Data
{
    public class DocumentDbContext : DbContext
    {
        public DocumentDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}
