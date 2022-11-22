import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknownToNumber',
})
export class UnknownToNumberPipe implements PipeTransform {
  transform(value: string): string {
    return isNaN(Number(value)) ? '0' : value;
  }
}
