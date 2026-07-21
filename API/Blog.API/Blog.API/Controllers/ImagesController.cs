using Blog.API.Models.Domain;
using Blog.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly IImageRepository _imageRepository;

    public ImagesController(IImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllImages()
    {
        return Ok(await _imageRepository.GetAll());
    }

    [HttpPost]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string fileName,
        [FromForm] string title)
    {
        ValidateUploadedFile(file);
        if (ModelState.IsValid)
        {
            BlogImage image = new()
            {
                FileExtension = Path.GetExtension(file.FileName).ToLower(),
                FileName = fileName,
                Title = title,
                DateCreated = DateTime.Now
            };
            var uploadedImage = await _imageRepository.Upload(file, image);
            return Ok(uploadedImage);
        }

        return BadRequest(ModelState);
    }

    private void ValidateUploadedFile(IFormFile file)
    {
        string[] allowedTypes = [".jpg", ".jpeg", ".png", ".webp"];
        if (!allowedTypes.Contains(Path.GetExtension(file.FileName).ToLower()))
            ModelState.AddModelError("file", "Unsupported File format");
        if (file.Length > 10485460) ModelState.AddModelError("file", "File size can't be more than 10MB");
    }
}
