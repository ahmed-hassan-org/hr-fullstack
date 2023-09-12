import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[wapelLazyloadingImage]',
})
export class LazyloadingImageDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}
