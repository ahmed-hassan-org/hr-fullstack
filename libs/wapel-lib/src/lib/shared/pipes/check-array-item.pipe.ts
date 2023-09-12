import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkArrayItem',
  pure: true,
})
export class CheckArrayItemPipe implements PipeTransform {
  /** chekk if specific item is in array after mapping it's values by property */
  transform(value: any[], prop: any, checkValue: any): boolean {
    /// if array is emty
    let arrayPropValue: string[] = [];
    if (!value) {
      return false;
    }
    arrayPropValue = value.map((ele) => ele[prop]);
    if (arrayPropValue.includes(checkValue)) {
      return true;
    }
    return false;
  }
}
