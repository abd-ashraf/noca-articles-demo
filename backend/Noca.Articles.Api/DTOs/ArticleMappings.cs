using Noca.Articles.Api.Domain;

namespace Noca.Articles.Api.DTOs;

public static class ArticleMappings
{
    public static ArticleDTO ToDTO(this Article a) => new(
        a.Id,
        a.ArticleNumber,
        a.Name,
        a.ArticleCategory,
        a.BicycleCategory,
        a.Material,
        a.NetWeightGrams
    );

    public static Article ToDomain(this CreateArticleDTO dto) => new()
    {
        ArticleNumber = dto.ArticleNumber,
        Name = dto.Name,
        ArticleCategory = dto.ArticleCategory,
        BicycleCategory = dto.BicycleCategory,
        Material = dto.Material,
        NetWeightGrams = dto.NetWeightGrams,
        LengthMm = dto.LengthMm,
        WidthMm = dto.WidthMm,
        HeightMm = dto.HeightMm
    };

    public static Article ToDomain(this UpdateArticleDTO dto) => new()
    {
        ArticleNumber = dto.ArticleNumber,
        Name = dto.Name,
        ArticleCategory = dto.ArticleCategory,
        BicycleCategory = dto.BicycleCategory,
        Material = dto.Material,
        NetWeightGrams = dto.NetWeightGrams,
        LengthMm = dto.LengthMm,
        WidthMm = dto.WidthMm,
        HeightMm = dto.HeightMm
    };
}
