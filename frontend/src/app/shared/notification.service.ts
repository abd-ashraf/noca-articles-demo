import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snack = inject(MatSnackBar);

  success(msg: string) {
    this.snack.open(msg, 'OK', { duration: 3000 });
  }
  error(msg: string) {
    this.snack.open(msg, 'Dismiss', { duration: 5000 });
  }
}
