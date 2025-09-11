import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RestService } from '../core/rest.service';
import {
  Article,
  ArticleCreateDto,
  ArticleUpdateDto,
} from '../models/article.model';
import { ArticleFilter } from '../models/article-filter.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private rest = inject(RestService);
  private readonly baseUrl = '/articles';

  list(filter?: ArticleFilter): Observable<Article[]> {
    return this.rest.get<Article[]>(this.baseUrl).pipe(
      map((articles) => {
        if (!filter) return articles;

        return articles.filter((a) => {
          const matchesCategory =
            !filter.articleCategory ||
            a.articleCategory === filter.articleCategory;
          const matchesBicycle =
            !filter.bicycleCategory?.length ||
            filter.bicycleCategory.every((c) => a.bicycleCategory.includes(c));
          const matchesMaterial =
            !filter.material || a.material === filter.material;

          return (
            matchesCategory &&
            matchesBicycle &&
            matchesMaterial
          );
        });
      })
    );
  }

  getById(id: number): Observable<Article> {
    return this.rest.get<Article>(`${this.baseUrl}/${id}`);
  }

  create(dto: ArticleCreateDto): Observable<Article> {
    return this.rest.post<Article>(this.baseUrl, dto);
  }

  update(id: number, dto: ArticleUpdateDto): Observable<void> {
    return this.rest.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.rest.delete<void>(`${this.baseUrl}/${id}`);
  }
}
