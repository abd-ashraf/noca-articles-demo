using Noca.Articles.Api.Data;
using Noca.Articles.Api.Domain;

namespace Noca.Articles.Api.Services;

public class ArticleService : IArticleService
{
    private readonly ArticleStore _store;
    // Constructor with DI
    public ArticleService(ArticleStore store) => _store = store;

    public IEnumerable<Article> GetAll() => _store.Articles;

    public Article? GetById(int id) =>
        _store.Articles.FirstOrDefault(a => a.Id == id);

    public Article Create(Article article)
    {
        // take the next id
        var id = _store.Articles.Count == 0 ? 1 : _store.Articles.Max(a => a.Id) + 1;
        article.Id = id;
        _store.Articles.Add(article);
        return article;
    }

    public bool Update(int id, Article updated)
    {
        // ensure the article exists
        var existing = _store.Articles.FirstOrDefault(a => a.Id == id);
        if (existing is null) return false;

        existing.ArticleNumber = updated.ArticleNumber;
        existing.Name = updated.Name;
        existing.ArticleCategory = updated.ArticleCategory;
        existing.BicycleCategory = updated.BicycleCategory;
        existing.Material = updated.Material;
        existing.NetWeightGrams = updated.NetWeightGrams;
        existing.LengthMm = updated.LengthMm;
        existing.WidthMm = updated.WidthMm;
        existing.HeightMm = updated.HeightMm;

        return true;
    }
}
