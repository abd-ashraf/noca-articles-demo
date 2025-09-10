using FluentValidation;
using Noca.Articles.Api.DTOs;

namespace Noca.Articles.Api.Validators;

public class CreateArticleDTOValidator : AbstractValidator<CreateArticleDTO>
{
    public CreateArticleDTOValidator()
    {
        // Validation rules
        RuleFor(x => x.ArticleNumber)
            .NotEmpty().WithMessage("Article number is required")
            .MaximumLength(50).WithMessage("Article number cannot exceed 50 characters");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(200).WithMessage("Name cannot exceed 200 characters");

        RuleFor(x => x.ArticleCategory)
            .NotEmpty().WithMessage("Article category is required")
            .MaximumLength(100).WithMessage("Article category cannot exceed 100 characters");

        RuleFor(x => x.BicycleCategory)
            .NotEmpty().WithMessage("At least one bicycle category is required")
            .Must(categories => categories.All(c => !string.IsNullOrWhiteSpace(c)))
            .WithMessage("Bicycle categories cannot contain empty values");

        RuleFor(x => x.Material)
            .NotEmpty().WithMessage("Material is required")
            .MaximumLength(100).WithMessage("Material cannot exceed 100 characters");

        RuleFor(x => x.NetWeightGrams)
            .GreaterThan(0).WithMessage("Net weight must be greater than 0");

        RuleFor(x => x.LengthMm)
            .GreaterThan(0).WithMessage("Length must be greater than 0");

        RuleFor(x => x.WidthMm)
            .GreaterThan(0).WithMessage("Width must be greater than 0");

        RuleFor(x => x.HeightMm)
            .GreaterThan(0).WithMessage("Height must be greater than 0");
    }
}