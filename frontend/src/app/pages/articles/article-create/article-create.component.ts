import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from '../../../services/articles.service';
import { ArticleCreateDto } from '../../../models/article.model';

@Component({
  selector: 'app-article-create',
  standalone: false,
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.scss'
})
export class ArticleCreateComponent {
  private fb = inject(FormBuilder);
  private articles = inject(ArticlesService);
  private router = inject(Router);

  submitting = false;

  articleCategories = ['Frame', 'Wheel', 'Brake', 'Drivetrain'];
  bicycleCategories = ['Road', 'Mountain', 'Hybrid', 'BMX', 'Kids'];
  materials = ['Aluminum', 'Steel', 'Carbon', 'Titanium'];

  form = this.fb.nonNullable.group({
    articleNumber: ['', Validators.required],
    name: ['', Validators.required],
    articleCategory: ['', Validators.required],
    bicycleCategory: this.fb.nonNullable.control<string[]>([], Validators.required),
    material: ['', Validators.required],
    netWeightGrams: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0)]),
    lengthMm: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0)]),
    widthMm: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0)]),
    heightMm: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0)])
  });

  submit(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    const dto: ArticleCreateDto = this.form.getRawValue();

    this.articles.create(dto).subscribe({
      next: () => this.router.navigate(['/articles']),
      error: (err) => {
        console.error('Create failed', err);
        this.submitting = false;
      }
    });
  }
}