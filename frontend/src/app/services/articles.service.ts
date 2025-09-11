import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../core/rest.service';
import { Article, ArticleCreateDto, ArticleUpdateDto } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private rest = inject(RestService);
  private readonly baseUrl = '/articles';

  list(): Observable<Article[]> {
    return this.rest.get<Article[]>(this.baseUrl);
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