using Blog.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions options) : base(options)
  {
  }

  private DbSet<BlogPost> BlogPosts { get; set; }
  private DbSet<Category> Categories { get; set; }
}