import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  standalone: true,
  selector: '[wapelRtl]',
})
/**
 * @description
 * right to left directive is used to change apperance of the element based on the language direction
 * like `arabic , farsi` languages and add css class `rtl-item` to host element this class
 * allow developer to catch it and add additional style in arabic language
 * if language nt arabic it remove the class
 */
export class RtlDirective implements OnInit {
  @Input() currentLanguage = '';
  defaultLang = '';
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.defaultLang = this.translateService.getDefaultLang() ?? 'ar';
    if (this.defaultLang === 'ar') {
      this.render.addClass(this.el.nativeElement, 'rtl');
    }
    this.translateService.onLangChange.subscribe((lang) => {
      if (lang.lang === 'ar') {
        this.render.addClass(this.el.nativeElement, 'rtl');
      } else {
        this.render.removeClass(this.el.nativeElement, 'rtl');
      }
    });
  }
}
