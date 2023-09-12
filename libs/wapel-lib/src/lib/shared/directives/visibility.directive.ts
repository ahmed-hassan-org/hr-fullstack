import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[wapelVisibility]',
})
export class VisibilityDirective implements OnChanges {
  constructor(private el: ElementRef<any>, private rendrer: Renderer2) {}
  @Input() visible = false;

  ngOnChanges() {
    if (this.visible) {
      this.rendrer.setStyle(
        this.el.nativeElement,
        'visibility',
        'visibility-visible',
      );
    } else {
      this.rendrer.setStyle(
        this.el.nativeElement,
        'visibility',
        'visibility-hidden',
      );
    }
  }
}
