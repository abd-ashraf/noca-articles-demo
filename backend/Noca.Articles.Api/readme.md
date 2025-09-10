# Noca.Articles.Api
Small ASP.NET Core backend for the Bicycles Article Management.

## Why Minimal APIs (vs controllers)
- **Less boilerplate**: Minimal APIs are concise, faster to write, and easier to review for a small CRUD service.
- **Recommended approach**: Microsoft now suggests Minimal APIs for new HTTP APIs.
- **Future-proof**: We can still layer in DTOs, validation, and persistence (EF Core, SQLite, etc.) as needed.
- **Clear separation**: Endpoints are declared directly in `Program.cs`, grouped by `/api/...`.

## Running locally
dotnet run
Health check: http://localhost:5000/ping
API root: http://localhost:5000/api

## Endpoints
Mapping is done via small transformation methods in `DTOs/ArticleMappings.cs`.
- GET /api/articles        returns ArticleDTO[]
- GET /api/articles/{id}   returns 200 with ArticleDTO or 404
- POST /api/articles       creates an article from CreateArticleDTO, returns 201 with ArticleDTO
- PUT /api/articles/{id}   updates fields from UpdateArticleDTO, returns 204 or 404

## Data Model (# This separation keeps API payloads lean.)
- **Domain/Article.cs**: Full entity with all fields, including dimensions.
- **DTOs/ArticleDTO.cs**: Used for list/detail views (excludes dimensions).
- **DTOs/CreateArticleDTO.cs**: Used when creating a new article.
- **DTOs/UpdateArticleDTO.cs**: Used when updating an existing article.

## Data Layer
This keeps `Program.cs` minimal and allows us to later swap the store for a real database (SQLite) with minimal changes.
- **ArticleStore.cs**: In-memory list seeded with a few example articles.
- **IArticleService.cs**: Interface abstraction for the service.
- **ArticleService.cs**: Provides CRUD operations.

## Validation
Using **FluentValidation** for Minimal APIs:
- Validators live in `Validators/*Validator.cs` and are registered via DI in Program.cs
- Using ValidationHelper to enforce rules on incoming DTOs

## API Documentation (Swagger / OpenAPI)
Swagger is enabled to explore and test endpoints in the browser.
- UI: http://url/swagger
- Spec: http://url/swagger/v1/swagger.json


## These are stubs only. In later commits we will:
- Implement filtering, sorting, pagination
- Add persistence (optional EF Core + SQLite)