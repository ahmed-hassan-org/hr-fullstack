import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: any[],
    searchText: string,
    objectProp = 'name',
    lang = 'en',
  ): any {
    if (!value || !searchText) {
      return value;
    }

    return value.filter((text: any) => {
      return text[objectProp][lang]
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });
  }
}
