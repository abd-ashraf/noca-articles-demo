import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-articles-list',
  standalone: false,
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
})
export class ArticlesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'articleNumber', 'name', 'articleCategory', 'material', 'netWeightGrams', 'actions'];
  articles: Article[] = [];
  loading = true;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.list().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
