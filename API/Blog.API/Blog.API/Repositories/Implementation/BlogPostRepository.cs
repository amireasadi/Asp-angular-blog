using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Repositories.Implementation;

public class BlogPostRepository : IBlogPostRepository
{
    private readonly AppDbContext _context;

    public BlogPostRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<BlogPost> CreateAsync(BlogPost blogPost)
    {
        await _context.BlogPosts.AddAsync(blogPost);
        await _context.SaveChangesAsync();
        return blogPost;
    }

    public async Task<IEnumerable<BlogPost>> GetAllAsync()
    {
        return await _context.BlogPosts.Include(b => b.Categories).ToListAsync();
    }

    public async Task<BlogPost?> GetByIdAsync(Guid id)
    {
        return await _context.BlogPosts.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);
    }
}