# NOCA Angular Frontend

## Why Angular with Material
- Less boilerplate compared to custom CSS frameworks
- Recommended approach for consistent UI and accessibility
- Future proof since Angular Material keeps up with Angular releases
- Clear separation of features components services and models

## Development server
To start a local development server, run:
```bash
npm install
ng serve
```
App runs on http://localhost:4200

## Folder structure
src/app
  app.module.ts
  app.component.*
  shared
    material.module.ts
  core
    rest.service.ts
    error.interceptor.ts
  models
    article.model.ts
    article-filter.model.ts

## Data model
- Article full entity with all fields including dimensions
- ArticleCreateDto used when creating a new article
- ArticleUpdateDto used when updating an existing article
- ArticleFilter used in frontend for filtering

## Services
- ArticlesService handles CRUD operations for /api/articles
- Uses RestService internally
- Provides methods list getById create update delete

## Routes
- /articles list page
- /articles/new create page
- /articles/:id/edit edit page

## FeatureModules
  ## Article modules
  - ArticlesModule is lazy loaded under /articles
  ## Articles list
  - Implemented list page with Angular Material table
  - Fetches data from backend via ArticlesService
  ## Create article
  - Reactive form with Material inputs and selects
  ## Edit article
  - Edit page loads existing article data into form
  - On submit calls ArticlesService.update
  - Shows success notification and navigates back to list


## These are stubs only In later commits we will
- Add Articles pages with create edit
- Implement filtering UI with Material form controls
- Implement ArticlesService for API calls
- Implement pagination and sorting when backend supports it

## Running unit tests
To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:
```bash
ng test
```