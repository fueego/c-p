import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  snackBarRef = inject(MatSnackBarRef);
}
