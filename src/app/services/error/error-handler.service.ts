import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from 'src/app/shared/components/error/error/error.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(ErrorComponent);
  }
}
