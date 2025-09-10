using Noca.Articles.Api.Domain;

namespace Noca.Articles.Api.Services;

public interface IArticleService
{
    IEnumerable<Article> GetAll();
    Article? GetById(int id);
    Article Create(Article article);
    bool Update(int id, Article updated);
}
