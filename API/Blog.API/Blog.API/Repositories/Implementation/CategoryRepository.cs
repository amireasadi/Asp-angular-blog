using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Repositories.Implementation;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Category> CreateAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task<Category?> EditAsync(Category category)
    {
        Category? existingCat = await _context.Categories.FindAsync(category.Id);
        if (existingCat == null)
            return null;
        existingCat.Name = category.Name;
        existingCat.UrlHandle = category.UrlHandle;
        await _context.SaveChangesAsync();
        return existingCat;
    }
}