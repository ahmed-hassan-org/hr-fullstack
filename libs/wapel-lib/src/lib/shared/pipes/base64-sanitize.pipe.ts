import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'base64sanitize',
  pure: true,
})
export class Base64SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): any {
    if (value) return this.sanitizer.bypassSecurityTrustUrl(value);
    else return null;
  }
}
