using Noca.Articles.Api.Data;
using Noca.Articles.Api.Services;
using Noca.Articles.Api.DTOs;
using Noca.Articles.Api.Helpers;
using Noca.Articles.Api.Validators;
using FluentValidation;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ArticleStore>();
builder.Services.AddSingleton<IArticleService, ArticleService>();

// Add FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<CreateArticleDTOValidator>();

// --- Swagger services ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// ------------------------

var app = builder.Build();

// --- Swagger middleware ---
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "NOCA Articles API");
    c.RoutePrefix = "swagger";
});
// -------------------------

// Simple health check endpoint
app.MapGet("/ping", () => Results.Ok("Noca.Articles.Api is running..."));

// Create api group
var api = app.MapGroup("/api");
api.MapGet("/", () => Results.Ok(new { service = "articles-api", version = "1.0" }));

// ----Articles endpoints----
var articles = api.MapGroup("/articles");

// GET /api/articles - get all articles
articles.MapGet("/", (IArticleService articleService) =>
{
    var list = articleService.GetAll().Select(a => a.ToDTO()).ToList();
    return Results.Ok(list);
});

// GET /api/articles/{id} - get article by id
articles.MapGet("/{id:int}", (int id, IArticleService articleService) =>
{
    var a = articleService.GetById(id);
    return a is null ? Results.NotFound() : Results.Ok(a.ToDTO());
});

// POST /api/articles - create new article
articles.MapPost("/", (
    CreateArticleDTO dto,
    IValidator<CreateArticleDTO> validator,
    IArticleService articleService) =>
{
    return ValidationHelper.ValidateAndExecute(dto, validator, validDto =>
    {
        var created = articleService.Create(validDto.ToDomain());
        return Results.Created($"/api/articles/{created.Id}", created.ToDTO());
    });
});

// PUT /api/articles/{id} - update article by id
articles.MapPut("/{id:int}", (
    int id,
    UpdateArticleDTO dto,
    IValidator<UpdateArticleDTO> validator,
    IArticleService articleService) =>
{
    return ValidationHelper.ValidateAndExecute(dto, validator, validDto =>
    {
        var ok = articleService.Update(id, validDto.ToDomain());
        return ok ? Results.NoContent() : Results.NotFound();
    });
});
// ----./Articles endpoints----

app.Run();
