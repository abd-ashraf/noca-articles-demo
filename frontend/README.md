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
    notification.service.ts
  core
    rest.service.ts
    error.interceptor.ts
  models
    article.model.ts
    article-filter.model.ts
  services
    articles.service.ts
  pages/articles
    articles.module.ts
    articles-routing.module.ts
    articles-list/
      articles-list.component.*
    article-create/
      article-create.component.*
    article-edit/
      article-edit.component.*
    articles-filter-bar/
      articles-filter-bar.component.*

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

## Feature modules
  ### Articles module
  - ArticlesModule is lazy loaded under /articles
  ### Articles list
  - Implemented list page with Angular Material table
  - Fetches data from backend via ArticlesService
  - Supports client side filtering and sorting
  ### Create article
  - Reactive form with Material inputs and selects
  - Shows validation errors and backend error messages
  - On success shows snackbar and navigates back to list
  ### Edit article
  - Edit page loads existing article data into form
  - On submit calls ArticlesService.update
  - Shows validation feedback and success notification

## Filtering Articles
- Implemented client side filtering with category, bicycle category and material

## Sorting
- Enabled MatSort on articles table
- Supports sorting by articleCategory and netWeightGrams

## These are stubs only In later commits we will
- Implement pagination when backend supports it
