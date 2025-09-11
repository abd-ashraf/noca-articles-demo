import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material.module';

import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesFilterBarComponent } from './articles-filter-bar/articles-filter-bar.component';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ArticlesFilterBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule {}
