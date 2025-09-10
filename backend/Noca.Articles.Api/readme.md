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
