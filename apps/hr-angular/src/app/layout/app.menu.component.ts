import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { AuthService } from '@wapelSharedLib/services/auth.service';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'hr-menu',
  templateUrl: './app.menu.component.html',
})
@UntilDestroy({ checkProperties: true })
export class AppMenuComponent extends WapelBase implements OnInit {
  sideMenuModel: MenuItem[] = [];
  override currentLanguage = signal('');

  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    private authService: AuthService,
  ) {
    super(injector);
    this.messageTranslationPrefix = 'LAYOUT.SIDEMENU.';
  }

  async ngOnInit() {
    this.getAppLanguage();
    this.sideMenuModel = await this.getSideMenuData();
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

  async getSideMenuData() {
    return [
      {
        id: 'HOME-PARENT-MENU',
        label: '',
        items: [
          {
            id: 'DASHBOARD-LINK-ITEM',
            label: '',
            icon: 'pi pi-fw pi-th-large mx-1',
            routerLink: ['/dashboard'],
            state: { user: 10, salary: 15000 },
          },
        ],
      },
      {
        id: 'PROGRAM-APP-MENU',
        label: '',
        items: [
          {
            id: 'COMPANY-PROFILE-ITEM',
            label: '',
            icon: 'pi pi-fw pi-th-large mx-1',
            routerLink: ['/company-profile'],
          },
        ],
      },
    ];
  }

  doSignout() {
    this.authService
      .signout()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.authService.setUserLoggedIn(false);
        this.getLocalStorage().removeLocal(LocalStorageKeys.APP_TOKEN_SESSION);
        this.getLocalStorage().removeSession(
          LocalStorageKeys.APP_TOKEN_SESSION,
        );
        this.getLocalStorage().removeSession(LocalStorageKeys.APP_IS_LOGGED);
        this.getRouter.navigate(['/auth/login']);
      });
  }
}
