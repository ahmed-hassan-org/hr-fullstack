import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summry',
  standalone: true,
})
export class SummryPipe implements PipeTransform {
  transform(value: string, to = 100): any {
    return value.substring(0, to);
  }
}
