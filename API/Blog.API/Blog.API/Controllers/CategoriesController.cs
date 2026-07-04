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

    public CategoriesController(ICategoryRepository categoryRepository)
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

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        return Ok(await _categoryRepository.GetAllAsync());
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
        var cat = await _categoryRepository.GetByIdAsync(id);
        if (cat != null)
            return Ok(cat);
        return NotFound("Category with the given id not found");
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> EditCategory(Guid id, EditCategoryRequestDto request)
    {
        Category category = new()
        {
            Id = id,
            Name = request.Name,
            UrlHandle = request.UrlHandle,
        };
        var cat = await _categoryRepository.EditAsync(category);
        if (cat == null)
            return NotFound();
        return Ok(cat);
    }
}