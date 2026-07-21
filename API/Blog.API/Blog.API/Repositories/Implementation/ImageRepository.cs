using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Repositories.Implementation;

public class ImageRepository : IImageRepository
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly AppDbContext _dbContext;

    public ImageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor,
        AppDbContext dbContext)
    {
        _webHostEnvironment = webHostEnvironment;
        _httpContextAccessor = httpContextAccessor;
        _dbContext = dbContext;
    }

    public async Task<BlogImage> Upload(IFormFile file, BlogImage image)
    {
        string imageFullName = $"{image.FileName}{image.FileExtension}";
        var httpRequest = _httpContextAccessor.HttpContext?.Request;
        // 1- upload image to the api
        var localPath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageFullName);
        await using var stream = new FileStream(localPath, FileMode.Create);
        await file.CopyToAsync(stream);

        // 2- update the database
        if (httpRequest != null)
        {
            var imageUrl = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{imageFullName}";
            image.Url = imageUrl;
            await _dbContext.BlogImages.AddAsync(image);
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            throw new NullReferenceException("Some thing went wrong creating the url");
        }

        return image;
    }

    public async Task<IEnumerable<BlogImage>> GetAll()
    {
        return await _dbContext.BlogImages.ToListAsync();
    }
}