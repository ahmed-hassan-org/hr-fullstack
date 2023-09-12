import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  signal,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { AppSidebarComponent } from '@hrLayout/app.sidebar.component';
import { LayoutService } from '@hrLayout/service/app.layout.service';

@Component({
  selector: 'hr-auth-main-layout',
  templateUrl: './auth-main-layout.component.html',
  styleUrls: ['./auth-main-layout.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class AuthMainLayoutComponent
  extends WapelBase
  implements OnInit, OnDestroy
{
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
  override currentLanguage = signal('');
  isLoginpageActive = false;
  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    public renderer: Renderer2,
  ) {
    super(injector);
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                event.target.classList.contains('p-trigger') ||
                event.target.parentNode.classList.contains('p-trigger')
              );

              if (isOutsideClicked) {
                this.layoutService.state.profileSidebarVisible = false;
                this.layoutService.state.overlayMenuActive = false;
                this.layoutService.state.staticMenuMobileActive = false;
                this.layoutService.state.menuHoverActive = false;
                // this.getMenuService.reset();
                this.menuOutsideClickListener();
                this.menuOutsideClickListener = null;
                this.unblockBodyScroll();
              } else {
                if (this.layoutService.state.staticMenuMobileActive) {
                  this.blockBodyScroll();
                }
              }
            },
          );
        }
      });

    this.getRouter.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.unblockBodyScroll();
      });
  }

  ngOnInit() {
    this.getAppLanguage();

    if (this.getActivatedRoute.snapshot.firstChild?.url[0]?.path === 'login') {
      this.isLoginpageActive = true;
    }
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG),
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-slim': this.layoutService.config.menuMode === 'slim',
      'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
      'layout-static-inactive':
        !this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'outlined',
      'p-ripple-disabled': !this.layoutService.config.ripple,
    };
  }

  get containerClassAr() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay-ar': this.layoutService.config.menuMode === 'overlay',
      'layout-static-ar': this.layoutService.config.menuMode === 'static',
      'layout-slim': this.layoutService.config.menuMode === 'slim',
      'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
      'layout-static-inactive':
        !this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'outlined',
      'p-ripple-disabled': !this.layoutService.config.ripple,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
