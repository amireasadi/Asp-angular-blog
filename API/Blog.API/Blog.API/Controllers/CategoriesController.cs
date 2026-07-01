using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Models.DTO;
using Blog.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController( ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryDTO category)
    {
        var newCat = new Category()
        {
            Name = category.Name,
            UrlHandle = category.UrlHandle,
        };
        
        await _categoryRepository.CreateAsync(newCat);
        
        return Ok(new CategoryDto()
        {
            Id = newCat.Id,
            Name = newCat.Name,
            UrlHandle = newCat.UrlHandle,
        });
    }
}