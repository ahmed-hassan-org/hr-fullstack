import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize',
})
export class SanitizePipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}
  transform(
    value: string,
    type: 'url' | 'html' | 'src' | 'string' = 'url'
  ): any {
    switch (type) {
      case 'src': {
        return this._domSanitizer.bypassSecurityTrustResourceUrl(value);
      }
      case 'url' || 'string': {
        return this._domSanitizer.bypassSecurityTrustUrl(value);
      }
      case 'html': {
        return this._domSanitizer.bypassSecurityTrustHtml(value);
      }
    }
    return '';
  }
}
