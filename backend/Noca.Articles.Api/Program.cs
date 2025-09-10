var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Simple health check endpoint
app.MapGet("/ping", () => Results.Ok("Noca.Articles.Api is running..."));

// Create api group
var api = app.MapGroup("/api");
api.MapGet("/", () => Results.Ok(new { service = "articles-api", version = "1.0"} ));

app.Run();
