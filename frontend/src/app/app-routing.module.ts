import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'articles',
    // Lazy load the Articles module
    loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule)
  },
  // Redirect empty path to articles
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'articles'
  },
  // Wildcard route for redirection to articles
  {
    path: '**',
    redirectTo: 'articles'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
