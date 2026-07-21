using Blog.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions options) : base(options)
  {
  }

  public DbSet<BlogPost> BlogPosts { get; set; }
  public DbSet<Category> Categories { get; set; }
  public DbSet<BlogImage> BlogImages { get; set; }
}