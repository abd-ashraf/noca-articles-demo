using Noca.Articles.Api.Data;
using Noca.Articles.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ArticleStore>();
builder.Services.AddSingleton<IArticleService, ArticleService>();

var app = builder.Build();

// Simple health check endpoint
app.MapGet("/ping", () => Results.Ok("Noca.Articles.Api is running..."));

// Create api group
var api = app.MapGroup("/api");
api.MapGet("/", () => Results.Ok(new { service = "articles-api", version = "1.0" }));

// Scaffold articles endpoints
var articles = api.MapGroup("/articles");

articles.MapGet("/", () =>
    Results.Ok(new[] {
        new { id = 1, title = "Test First Article", content = "This is the content of the first article." },
        new { id = 2, title = "Test Second Article", content = "This is the content of the second article." }
    })
);

articles.MapGet("/{id:int}", (int id) =>
    Results.Ok(new { id = id, title = $"Test Article {id}", content = $"This is the content of test article {id}." })
);

articles.MapPost("/", () =>
    // Create DTOs later
    Results.BadRequest("Not implemented")
);

articles.MapPut("/{id:int}", (int id) =>
    // Update DTOs later
    Results.BadRequest("Not implemented")
);

app.Run();
