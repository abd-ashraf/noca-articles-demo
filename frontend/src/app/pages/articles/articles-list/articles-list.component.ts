import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.load();
  }

  onFilterChanged(f: ArticleFilter) {
    this.filter = f;
    this.load();
  }

  onSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') return;

    const dir = sort.direction === 'asc' ? 1 : -1;
    this.articles = [...this.articles].sort((a, b) => {
      switch (sort.active) {
        case 'netWeightGrams':
          return (a.netWeightGrams - b.netWeightGrams) * dir;
        case 'articleCategory':
          return a.articleCategory.localeCompare(b.articleCategory) * dir;
        default:
          return 0;
      }
    });
  }

  private load(): void {
    this.loading = true;
    this.articlesService.list(this.filter).subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  trackById = (_: number, a: Article) => a.id;
}
