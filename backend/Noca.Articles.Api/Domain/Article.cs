namespace Noca.Articles.Api.Domain;

public class Article
{
    public int Id { get; set; }
    public string ArticleNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ArticleCategory { get; set; } = string.Empty;
    public List<string> BicycleCategory { get; set; } = new();
    public string Material { get; set; } = string.Empty;
    public int NetWeightGrams { get; set; }
    public int LengthMm { get; set; }
    public int WidthMm { get; set; }
    public int HeightMm { get; set; }
}