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
        var blogposts = await _blogPostRepository.GetAllAsync();
        var response = new List<BlogPostDto>();
        foreach (var post in blogposts)
        {
            response.Add(new BlogPostDto()
            {
                Id = post.Id,
                Title = post.Title,
                ShortDescription = post.ShortDescription,
                Content = post.Content,
                Author = post.Author,
                FeaturedImageUrl = post.FeaturedImageUrl,
                PublishedDate = post.PublishedDate,
                IsVisible = post.IsVisible,
                UrlHandle = post.UrlHandle,
                Categories = post.Categories.Select((cat) => new CategoryDto
                    {
                        Id = cat.Id,
                        Name = cat.Name,
                        UrlHandle = cat.UrlHandle,
                    })
                    .ToList()
            });
        }

        return Ok(response);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        BlogPost? existingPost = await _blogPostRepository.GetByIdAsync(id);
        if (existingPost == null)
        {
            return NotFound();
        }

        BlogPostDto response = new()
        {
            Id = existingPost.Id,
            Title = existingPost.Title,
            ShortDescription = existingPost.ShortDescription,
            Content = existingPost.Content,
            Author = existingPost.Author,
            FeaturedImageUrl = existingPost.FeaturedImageUrl,
            PublishedDate = existingPost.PublishedDate,
            IsVisible = existingPost.IsVisible,
            UrlHandle = existingPost.UrlHandle,
            Categories = existingPost.Categories.Select((cat) => new CategoryDto
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    UrlHandle = cat.UrlHandle,
                })
                .ToList()
        };

        return Ok(response);
    }
    
    [HttpGet("{url}")]
    public async Task<IActionResult> GetByUrlHandle(string url)
    {
        BlogPost? existingPost = await _blogPostRepository.GetByUrlHandleAsync(url);
        if (existingPost == null)
        {
            return NotFound();
        }

        BlogPostDto response = new()
        {
            Id = existingPost.Id,
            Title = existingPost.Title,
            ShortDescription = existingPost.ShortDescription,
            Content = existingPost.Content,
            Author = existingPost.Author,
            FeaturedImageUrl = existingPost.FeaturedImageUrl,
            PublishedDate = existingPost.PublishedDate,
            IsVisible = existingPost.IsVisible,
            UrlHandle = existingPost.UrlHandle,
            Categories = existingPost.Categories.Select((cat) => new CategoryDto
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    UrlHandle = cat.UrlHandle,
                })
                .ToList()
        };

        return Ok(response);
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> UpdateById(Guid id, UpdateBlogPosRequestDto request)
    {
        BlogPost existingPost = new()
        {
            Id = id,
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
                existingPost.Categories.Add(existingCat);
        }

        var editedPost = await _blogPostRepository.EditAsync(existingPost);
        if (editedPost == null)
            return NotFound();

        BlogPostDto response = new()
        {
            Id = existingPost.Id,
            Title = existingPost.Title,
            ShortDescription = existingPost.ShortDescription,
            Content = existingPost.Content,
            Author = existingPost.Author,
            FeaturedImageUrl = existingPost.FeaturedImageUrl,
            PublishedDate = existingPost.PublishedDate,
            IsVisible = existingPost.IsVisible,
            UrlHandle = existingPost.UrlHandle,
            Categories = existingPost.Categories.Select((cat) => new CategoryDto
                {
                    Id = cat.Id,
                    Name = cat.Name,
                    UrlHandle = cat.UrlHandle,
                })
                .ToList()
        };
        
        return Ok(response);
    }
    
    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> DeleteById(Guid id)
    {
        BlogPost? existingPost = await _blogPostRepository.DeleteAsync(id);
        if (existingPost == null)
        {
            return NotFound();
        }

        BlogPostDto response = new()
        {
            Id = existingPost.Id,
            Title = existingPost.Title,
            ShortDescription = existingPost.ShortDescription,
            Content = existingPost.Content,
            Author = existingPost.Author,
            FeaturedImageUrl = existingPost.FeaturedImageUrl,
            PublishedDate = existingPost.PublishedDate,
            IsVisible = existingPost.IsVisible,
            UrlHandle = existingPost.UrlHandle,
        };

        return Ok(response);
    }
}