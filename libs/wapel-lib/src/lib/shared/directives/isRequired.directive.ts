import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[wapelIsRequired]',
})
export class IsRequiredDirective implements OnInit {
  @Input() isRequiredField = true;
  constructor(private domElement: ElementRef, private rendrer: Renderer2) {}

  ngOnInit() {
    if (this.isRequiredField) {
      this.rendrer.addClass(this.domElement.nativeElement, 'p-required-field');
    } else {
      this.rendrer.removeClass(
        this.domElement.nativeElement,
        'p-required-field',
      );
    }
  }
}
