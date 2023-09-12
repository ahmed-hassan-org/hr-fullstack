import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[hrMainLayout]',
  standalone: true,
})
@UntilDestroy({ checkProperties: true })
export class HrMainLayoutDirective implements OnInit {
  @Input() moduleName: 'AUTH' | 'COMPANY-PROFILE' = 'AUTH';
  constructor(
    private render: Renderer2,
    private ele: ElementRef,
    private translate: TranslateService,
  ) {}



  ngOnInit(): void {
    const savedLang = localStorage.getItem(LocalStorageKeys.APP_LANG);
    if (savedLang === 'ar') {
      if (this.moduleName === 'AUTH') {
        this.render.addClass(this.ele.nativeElement, 'auth-page-ar');
      } else {
        this.render.removeClass(this.ele.nativeElement, 'auth-page-ar');
      }
    } else {
      if (this.moduleName === 'AUTH') {
        this.render.addClass(this.ele.nativeElement, 'auth-page');
      } else {
        this.render.removeClass(this.ele.nativeElement, 'auth-page');
      }
    }

    this.translate.onLangChange.subscribe((data) => {
      if (data.lang === 'ar') {
        if (this.moduleName === 'AUTH') {
          this.render.addClass(this.ele.nativeElement, 'auth-page-ar');
        } else {
          this.render.removeClass(this.ele.nativeElement, 'auth-page-ar');
        }
      } else {
        if (this.moduleName === 'AUTH') {
          this.render.addClass(this.ele.nativeElement, 'auth-page');
        } else {
          this.render.removeClass(this.ele.nativeElement, 'auth-page');
        }
      }
    });
  }
}
