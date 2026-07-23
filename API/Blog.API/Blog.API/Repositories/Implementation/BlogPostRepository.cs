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
        return await _context.BlogPosts.Include(b => b.Categories)
            .ToListAsync();
    }

    public async Task<BlogPost?> GetByIdAsync(Guid id)
    {
        return await _context.BlogPosts.Include(b => b.Categories)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<BlogPost?> GetByUrlHandleAsync(string url)
    {
        return await _context.BlogPosts.Include(b => b.Categories)
            .FirstOrDefaultAsync(b => b.UrlHandle == url);
    }

    public async Task<BlogPost?> EditAsync(BlogPost blogPost)
    {
        var existingPost = await _context.BlogPosts.Include(b => b.Categories)
            .FirstOrDefaultAsync(b => b.Id == blogPost.Id);
        if (existingPost == null)
            return null;
        _context.Entry(existingPost)
            .CurrentValues.SetValues(blogPost);
        existingPost.Categories = blogPost.Categories;
        await _context.SaveChangesAsync();
        return existingPost;
    }

    public async Task<BlogPost?> DeleteAsync(Guid id)
    {
        var selectedPost = await _context.BlogPosts.FindAsync(id);
        if (selectedPost == null)
            return null;
        var deletePost = _context.BlogPosts.Remove(selectedPost);
        await _context.SaveChangesAsync();
        return deletePost.Entity;
    }
}