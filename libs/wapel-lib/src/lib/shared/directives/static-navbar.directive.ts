import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[wapelStaticNavbar]',
})
export class StaticNavbarDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}
  windowScroll$ = fromEvent(window, 'scroll');
  ngOnInit() {
    this.windowScroll$.subscribe(() => {
      const posY = window.pageYOffset;
      if (posY > 200) {
        this.render.addClass(this.el.nativeElement, 'sidenav-static');
      } else if (posY < 200) {
        this.render.removeClass(this.el.nativeElement, 'sidenav-static');
      }
    });
  }
}
