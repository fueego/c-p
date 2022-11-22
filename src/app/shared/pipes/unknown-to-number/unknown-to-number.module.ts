import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownToNumberPipe } from './unknown-to-number.pipe';

@NgModule({
  declarations: [UnknownToNumberPipe],
  imports: [CommonModule],
  exports: [UnknownToNumberPipe],
})
export class UnknownToNumberModule {}
