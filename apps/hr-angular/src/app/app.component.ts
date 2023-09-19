import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { NavigationPaths } from '@hrCore/routes/NavigationPaths.enum';
import { LayoutService } from '@hrLayout/service/app.layout.service';
import { ApplicationSettingsService } from '@hrServices/application-settings.service';
import { AuthService } from '@hrServices/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'hr-root',
  templateUrl: './app.component.html',
})
@UntilDestroy({ checkProperties: true })
export class AppComponent extends WapelBase implements OnInit {
  override currentLanguage = signal('');
  isSocketConnected = false;
  intTimer!: any;
  constructor(
    injector: Injector,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    public layoutService: LayoutService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getAppLanguage();
    this.setAppLanguageConfig();
    // this.checkUserloggedInOnStart();
    this.getRolesPermissionData();
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG)
    );
    this.getTranslation()
      .onDefaultLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  getRolesPermissionData() {
    const rolesPerm: any = this.getLocalStorage().getSessionStorage(
      LocalStorageKeys.APP_TREE
    );
    if (rolesPerm) {
      const moduleSbmoduleList = rolesPerm.modulesSubmodule;
      const screensList = rolesPerm.screens;
      this.getpermissionService().flushPermissions();

      // this.getMenuService.setModuleScreenPermission(rolesPerm);
      // must add this line of code by take the screen from the response
      this.getpermissionService().addPermission([
        ...moduleSbmoduleList,
        ...screensList,
      ]);
    }
  }

  /** application language config */
  async setAppLanguageConfig() {
    const setting = await ApplicationSettingsService.getSettingsModel;
    this.currentLanguage.set(
      this.getLocalStorage()?.getLocal(LocalStorageKeys.APP_LANG)
        ? this.getLocalStorage().getLocal(LocalStorageKeys.APP_LANG)
        : setting.defaultLanguage
    );

    this.localStorageService.setLocal(
      LocalStorageKeys.APP_LANG,
      (setting?.defaultLanguage as string) ?? this.currentLanguage() ?? 'en'
    );
    this.getTranslation().use(
      this.currentLanguage() ?? (setting.defaultLanguage as string)
    );
    this.getTranslation().setDefaultLang(
      this.currentLanguage() ?? (setting.defaultLanguage as string)
    );
    this.getTranslation().onLangChange.subscribe((lang) => {
      this.changePageDirection(lang?.lang);
      this.localStorageService.setLocal(LocalStorageKeys.APP_LANG, lang?.lang);
    });
  }

  /**
   * @description change font when app start up or language change
   */
  changePageDirection(lang: string) {
    if (lang === 'ar') {
      this.getDocument()!
        .getElementById('htmlParentItem')!
        .setAttribute('dir', 'rtl');
      // this line to change the language
      this.getDocument()!
        .getElementById('htmlParentItem')!
        .setAttribute('lang', 'ar');
      this.getDocument()!
        .getElementById('theme-css')!
        .setAttribute(
          'href',
          'assets/layout/styles/theme/lara-light-indigo/theme-rtl.css'
        );
      this.getDocument()!.getElementById('htmlParentItem')!.style.fontFamily =
        'Cairo, sans-serif';
    } else {
      this.getDocument()!
        .getElementById('htmlParentItem')!
        .setAttribute('dir', 'ltr');
      // this line to change the language
      this.getDocument()!
        .getElementById('htmlParentItem')!
        .setAttribute('lang', 'en-US');
      this.getDocument()!
        .getElementById('theme-css')!
        .setAttribute(
          'href',
          'assets/layout/styles/theme/lara-light-indigo/theme.css'
        );
      this.getDocument()!.getElementById('htmlParentItem')!.style.fontFamily =
        'Plus Jakarta Sans, sans-serif';
    }
  }

  async checkUserloggedInOnStart() {
    const localData = this.localStorageService.getLocal(
      LocalStorageKeys.APP_IS_LOGGED
    );
    const sessionData = this.localStorageService.getSessionStorage(
      LocalStorageKeys.APP_IS_LOGGED
    );

    if (!this.authService.checkTokenExpired() as boolean) {
      this.getAlertToaster().showToastWarn('', 'Current user token is expired');
      this.getRouter.navigate(['/auth']);
      return;
    }

    if (!localData && !sessionData) {
      this.getRouter.navigate(['/auth']);
    } else {
      this.getRouter.navigate(['/dashboard']);
    }
  }
}
