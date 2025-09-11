# NOCA Articles Demo

A full-stack demo application for **Bicycles Article Management**.  
- Backend: **ASP.NET Core Minimal API** (in-memory store, validation, Swagger).  
- Frontend: **Angular 19 with Angular Material** (CRUD UI, filtering, sorting).  

---

## Project structure
backend/Noca.Articles.Api → ASP.NET Core API
frontend/ → Angular frontend
run-dev.sh → Helper script to start both

Each part also has its own README for more details:  
- [backend/Noca.Articles.Api/readme.md](backend/Noca.Articles.Api/readme.md)  
- [frontend/README.md](frontend/README.md)

---

## Running the project

### Option A: Using the provided shell script (recommended)

At the repo root:

chmod +x run-dev.sh  
./run-dev.sh  

This will:  
- Start the backend API on `http://localhost:5085` (or a free port .NET picks).  
- Start the Angular frontend dev server on `http://localhost:4200`.  

Press `Ctrl+C` to stop both.

---

### Option B: Run backend and frontend separately (manual)

#### Backend (API)

cd backend/Noca.Articles.Api  
dotnet run  

Default URLs:  
- Health check -> http://localhost:5000/ping  
- API root -> http://localhost:5000/api
- Swagger -> http://localhost:5000/swagger

#### Frontend (Angular)

cd frontend  
npm install  
ng serve  

Runs at: http://localhost:4200

---

## Features

### Backend
- Minimal API endpoints for `/api/articles` (GET, GET by id, POST, PUT).  
- In-memory store with seed data.  
- Validation with FluentValidation.  
- Swagger UI for API exploration.  

### Frontend
- Angular 19 with Angular Material UI.  
- CRUD UI for Articles: list, create, edit.  
- Reactive forms with validation and error handling.  
- Client-side filtering (category, bicycle category, material, search).  
- Client-side sorting by `articleCategory` and `netWeightGrams`.  

---

## Notes
- Frontend and backend are **separate services** in development (different ports).  
- CORS is already enabled in the backend for `http://localhost:4200`.
- Deployment can later be unified (e.g. serve Angular build from .NET `wwwroot`), but for dev the services run separately.  