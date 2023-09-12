import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraynclude',
})
export class ArrayIncludePipe implements PipeTransform {
  transform(value: any[], idx?: number): any {
    if (!value) {
      return value;
    }

    if (value.includes(idx)) {
      return true;
    } else {
      return false;
    }
  }
}
