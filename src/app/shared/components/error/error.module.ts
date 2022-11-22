import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { MaterialComponentsModule } from '../../module/material-components.module';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, MaterialComponentsModule],
  exports: [ErrorComponent],
})
export class ErrorModule {}
