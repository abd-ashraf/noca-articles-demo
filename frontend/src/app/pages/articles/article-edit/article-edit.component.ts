import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../services/articles.service';
import { Article, ArticleUpdateDto } from '../../../models/article.model';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-article-edit',
  standalone: false,
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.scss',
})
export class ArticleEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articles = inject(ArticlesService);
  private notify = inject(NotificationService);

  submitting = false;
  submitted = false;
  loading = true;
  serverErrors: string[] = [];
  id!: number;

  articleCategories = ['Hub', 'Crank arm'];
  bicycleCategories = ['e-Cargo bike', 'Road', 'Gravel', 'e-Gravel', 'e-Trekking', 'e-City', 'e-Trekking', 'Foldable'];
  materials = ['Aluminium', 'Steel', 'Alloy', 'Carbon', 'Nickel'];

  // Form group for article editing
  form = this.fb.nonNullable.group({
    articleNumber: ['', Validators.required],
    name: ['', Validators.required],
    articleCategory: ['', Validators.required],
    bicycleCategory: this.fb.nonNullable.control<string[]>(
      [],
      Validators.required
    ),
    material: ['', Validators.required],
    netWeightGrams: this.fb.nonNullable.control<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
    lengthMm: this.fb.nonNullable.control<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
    widthMm: this.fb.nonNullable.control<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
    heightMm: this.fb.nonNullable.control<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.notify.error('Invalid article id');
      this.router.navigate(['/articles']);
      return;
    }

    this.articles.getById(this.id).subscribe({
      next: (article: Article) => {
        this.form.patchValue(article);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.handleServerError(err);
        this.router.navigate(['/articles']);
      },
    });
  }

  submit(): void {
    this.submitted = true; // ← add this
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const dto: ArticleUpdateDto = this.form.getRawValue();
    this.articles.update(this.id, dto).subscribe({
      next: () => {
        this.notify.success('Article updated');
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        this.submitting = false;
        this.handleServerError(err); // ← map backend errors
      },
    });
  }

  hasError(name: string, error: string): boolean {
    const c = this.form.get(name);
    if (!c) return false;
    // show when invalid after: touched OR dirty OR user tried to submit
    return !!c.errors?.[error] && (c.touched || c.dirty || this.submitted);
  }

  private handleServerError(err: any) {
    const errors = err?.error?.errors;
    this.serverErrors = [];
    if (errors && typeof errors === 'object') {
      const summary: string[] = [];
      Object.keys(errors).forEach((key) => {
        const messages = Array.isArray(errors[key])
          ? errors[key]
          : [String(errors[key])];
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

  private lowercaseFirst(s: string): string {
    return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  }
}
