# Noca.Articles.Api
Small ASP.NET Core backend for the Bicycles Article Management.

## Why Minimal APIs (vs controllers)
- **Less boilerplate**: Minimal APIs are concise, faster to write, and easier to review for a small CRUD service.
- **Recommended approach**: Microsoft now suggests Minimal APIs for new HTTP APIs.
- **Future-proof**: We can still layer in DTOs, validation, and persistence (EF Core, SQLite, etc.) as needed.
- **Clear separation**: Endpoints are declared directly in `Program.cs`, grouped by `/api/...`.

## Running locally
```bash
dotnet run
Health check: http://localhost:5000/ping
API root: http://localhost:5000/api
```bash

## Endpoints (scaffolded)
- `GET /api/articles` — returns a test articles list for now
- `GET /api/articles/{id}` — placeholder, always returns test article
- `POST /api/articles` — placeholder, always returns 400
- `PUT /api/articles/{id}` — placeholder, always returns 400

These are stubs only. In later commits we will:
- Add DTOs (ArticleDto, CreateArticleDto, UpdateArticleDto)
- Introduce an in-memory store with seeded data
- Implement filtering, sorting, pagination
- Add validation and persistence (optional EF Core + DB)