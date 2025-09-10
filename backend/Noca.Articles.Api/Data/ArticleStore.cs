using Noca.Articles.Api.Domain;

namespace Noca.Articles.Api.Data;

public class ArticleStore
{
    public List<Article> Articles { get; } = Seed();

    private static List<Article> Seed() => new()
    {
        new Article
        {
            Id = 1,
            ArticleNumber = "100291",
            Name = "e-Cargo bike hub speed 10x",
            ArticleCategory = "Hub",
            BicycleCategory = new() { "e-Cargo bike" },
            Material = "Aluminium",
            NetWeightGrams = 450,
            LengthMm = 110,
            WidthMm = 100,
            HeightMm = 20
        },
        new Article
        {
            Id = 2,
            ArticleNumber = "100292",
            Name = "Road hub flex",
            ArticleCategory = "Hub",
            BicycleCategory = new() { "Road" },
            Material = "Steel",
            NetWeightGrams = 520,
            LengthMm = 100,
            WidthMm = 90,
            HeightMm = 20
        }
    };
}
