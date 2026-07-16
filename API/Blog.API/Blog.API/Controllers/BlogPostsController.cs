using Blog.API.Models.Domain;
using Blog.API.Models.DTO;
using Blog.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlogPostsController : ControllerBase
{
    private readonly IBlogPostRepository _blogPostRepository;
    private readonly ICategoryRepository _categoryRepository;

    public BlogPostsController(IBlogPostRepository blogPostRepository,
        ICategoryRepository categoryRepository)
    {
        _blogPostRepository = blogPostRepository;
        _categoryRepository = categoryRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBlogPost(CreateBlogPosRequestDto request)
    {
        BlogPost newPost = new()
        {
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            Content = request.Content,
            Author = request.Author,
            FeaturedImageUrl = request.FeaturedImageUrl,
            PublishedDate = request.PublishedDate,
            IsVisible = request.IsVisible,
            UrlHandle = request.UrlHandle,
            Categories = new List<Category>()
        };

        foreach (var catId in request.Categories)
        {
            var existingCat = await _categoryRepository.GetByIdAsync(catId);
            if (existingCat != null)
                newPost.Categories.Add(existingCat);
        }

        await _blogPostRepository.CreateAsync(newPost);

        BlogPostDto response = new()
        {
            Id = newPost.Id,
            Title = newPost.Title,
            ShortDescription = newPost.ShortDescription,
            Content = newPost.Content,
            Author = newPost.Author,
            FeaturedImageUrl = newPost.FeaturedImageUrl,
            PublishedDate = newPost.PublishedDate,
            IsVisible = newPost.IsVisible,
            UrlHandle = newPost.UrlHandle,
            Categories = newPost.Categories.Select((cat) => new CategoryDto
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    UrlHandle = cat.UrlHandle,
                })
                .ToList()
        };

        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPosts()
    {
        return Ok(await _blogPostRepository.GetAllAsync());
    }
}