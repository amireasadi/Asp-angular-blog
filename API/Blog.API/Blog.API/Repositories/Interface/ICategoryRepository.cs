using Blog.API.Models.Domain;

namespace Blog.API.Repositories.Interface;

public interface ICategoryRepository
{
    Task<Category> CreateAsync(Category category);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(Guid id);
    Task<Category?> EditAsync(Category category);
    Task<Category?> DeleteAsync(Guid id);
}