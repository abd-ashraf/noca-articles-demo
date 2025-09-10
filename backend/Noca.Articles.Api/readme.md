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

## Endpoints (scaffolded)
- `GET /api/articles` — returns a test articles list for now
- `GET /api/articles/{id}` — placeholder, always returns test article
- `POST /api/articles` — placeholder, always returns 400
- `PUT /api/articles/{id}` — placeholder, always returns 400

## Data Model (# This separation keeps API payloads lean.)
- **Domain/Article.cs**: Full entity with all fields, including dimensions.
- **DTOs/ArticleDTO.cs**: Used for list/detail views (excludes dimensions).
- **DTOs/CreateArticleDTO.cs**: Used when creating a new article.
- **DTOs/UpdateArticleDTO.cs**: Used when updating an existing article.

## These are stubs only. In later commits we will:
- Introduce an in-memory store with seeded data
- Implement filtering, sorting, pagination
- Add validation and persistence (optional EF Core + SQLite)