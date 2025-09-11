import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService } from '../../../services/articles.service';
import { ArticleCreateDto } from '../../../models/article.model';
import { NotificationService } from '../../../shared/notification.service';

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
  private notify = inject(NotificationService);

  submitting = false;
  serverErrors: string[] = [];

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
    this.serverErrors = [];
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const dto: ArticleCreateDto = this.form.getRawValue();

    this.articles.create(dto).subscribe({
      next: () => {
        this.notify.success('Article created');
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        this.submitting = false;
        this.handleServerError(err);
      }
    });
  }

  private handleServerError(err: any) {
    const errors = err?.error?.errors;
    if (errors && typeof errors === 'object') {
      // Map field errors onto controls and collect messages
      const summary: string[] = [];
      Object.keys(errors).forEach(key => {
        const messages = Array.isArray(errors[key]) ? errors[key] : [String(errors[key])];
        const ctrl = this.form.get(this.lowercaseFirst(key));
        if (ctrl) {
          ctrl.setErrors({ server: messages.join(' ') });
          ctrl.markAsTouched();
        }
        summary.push(`${key}: ${messages.join(' ')}`);
      });
      this.serverErrors = summary;
      this.notify.error('Please fix the highlighted fields');
      return;
    }

    const msg = err?.error?.message || err?.message || 'Request failed';
    this.serverErrors = [msg];
    this.notify.error(msg);
  }

  // Backend keys often start with uppercase (e.g., ArticleNumber)
  private lowercaseFirst(s: string): string {
    return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  }

  // Convenience for template
  hasError(name: string, error: string): boolean {
    const ctrl = this.form.get(name) as AbstractControl | null;
    return !!ctrl && ctrl.touched && !!ctrl.errors?.[error];
  }
}