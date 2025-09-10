namespace Noca.Articles.Api.DTOs;

public record ArticleDTO(
    int Id,
    string ArticleNumber,
    string Name,
    string ArticleCategory,
    List<string> BicycleCategory,
    string Material,
    int NetWeightGrams
);
