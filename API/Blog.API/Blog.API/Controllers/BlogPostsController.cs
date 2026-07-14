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

    public BlogPostsController(IBlogPostRepository blogPostRepository)
    {
        _blogPostRepository = blogPostRepository;
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
            PublishedDate= request.PublishedDate,
            IsVisible = request.IsVisible,
            UrlHandle = request.UrlHandle,
        };
        await _blogPostRepository.CreateAsync(newPost);
        return Ok(newPost);
    }
}