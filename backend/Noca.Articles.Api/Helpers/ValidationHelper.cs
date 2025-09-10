using FluentValidation;

namespace Noca.Articles.Api.Helpers;

public static class ValidationHelper
{
    public static IResult ValidateAndExecute<T>(
        T model,
        IValidator<T> validator,
        Func<T, IResult> handler) where T : class
    {
        // Basic null check
        if (model == null)
        {
            return Results.BadRequest("Model cannot be null");
        }

        // Validate the model
        var validationResult = validator.Validate(model);
        
        // If validation fails, return 400 with errors
        if (!validationResult.IsValid)
        {
            // Group errors by property name
            var errors = validationResult.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray()
                );

            return Results.ValidationProblem(errors);
        }
        
        // If valid, execute the handler
        return handler(model);
    }
}