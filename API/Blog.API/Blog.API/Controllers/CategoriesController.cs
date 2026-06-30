using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryDTO category)
    {
        var newCat = new Category()
        {
            Name = category.Name,
            UrlHandle = category.UrlHandle,
        };

        await _context.Categories.AddAsync(newCat);
        await _context.SaveChangesAsync();
        return Ok(new CategoryDto()
        {
            Id = newCat.Id,
            Name = newCat.Name,
            UrlHandle = newCat.UrlHandle,
        });
    }
}