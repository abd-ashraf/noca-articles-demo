import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { Article } from '../../../models/article.model';
import { ArticleFilter } from '../../../models/article-filter.model';

@Component({
  selector: 'app-articles-list',
  standalone: false,
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
})
export class ArticlesListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'articleNumber',
    'name',
    'articleCategory',
    'bicycleCategory',
    'material',
    'netWeightGrams',
    'actions',
  ];
  articles: Article[] = [];
  loading = true;
  filter: ArticleFilter = {};

  onFilterChanged(f: ArticleFilter) {
    this.filter = f;
    this.load();
  }

  private load() {
    this.loading = true;
    this.articlesService.list(this.filter).subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.list().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
