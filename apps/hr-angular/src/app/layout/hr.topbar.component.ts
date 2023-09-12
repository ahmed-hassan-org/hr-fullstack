import { Component, Injector, OnInit, signal } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  fadeInOnEnterAnimation,
  fadeOutUpOnLeaveAnimation,
} from 'angular-animations';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { LayoutService } from './service/app.layout.service';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { AuthService } from '@wapelSharedLib/services/auth.service';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
@Component({
  selector: 'hr-main-topbar',
  templateUrl: './hr.topbar.component.html',
  animations: [
    fadeOutUpOnLeaveAnimation({ duration: 300, delay: 40 }),
    fadeInOnEnterAnimation({ duration: 350, delay: 40 }),
  ],
})
@UntilDestroy({ checkProperties: true })
export class HrMainTopBarComponent extends WapelBase implements OnInit {
  isLoggedin$!: Observable<boolean>;
  showHeaderNotification = false;
  showHeaderWidget = false;
  selectedLanguage = signal<any>({
    id: 1,
    value: 'ar',
    label: 'Arabic',
    icon: '/assets/icons/sa.svg',
  });
  langs = [
    { id: 1, value: 'ar', label: 'Arabic', icon: '/assets/icons/sa.svg' },
    { id: 2, value: 'en', label: 'English', icon: '/assets/icons/uk.svg' },
  ];
  ProfileItems: MenuItem[] = [
    {
      id: 'HEADER-PROFILE-TEXT',
      label: '',
      icon: 'pi pi-user mx-1',
      routerLink: '/auth/user-profile',
    },
    // { id: 'HEADER-SETTING-TEXT', label: '', icon: 'pi pi-cog mx-1' },
    { id: 'HEADER-LANGUAGE-TEXT', label: '', icon: 'pi pi-globe mx-1' },
    { separator: true },
    {
      id: 'HEADER-FULLSCREEN-MODE-NAME',
      label: '',
      icon: 'pi pi-window-maximize mx-1',
      command: () => {
        this.getFusionHelper().fullScreenMode();
      },
    },
    { separator: true },
    {
      id: 'HEADER-SIGNOUT-TEXT',
      label: '',
      icon: 'pi pi-sign-out mx-1',
      command: () => {
        this.doSignout();
      },
    },
  ];
  notificationCount: any = 0;
  override currentLanguage = signal('');
  todayDate = new Date();
  availableRolesList: any = [];
  selectedRole!: any;
  currentSession!: any;
  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    private authService: AuthService,
  ) {
    super(injector);
    this.messageTranslationPrefix = 'LAYOUT.HEADER.';
  }

  ngOnInit(): void {
    this.getAppLanguage();
    this.currentSession = this.authService.getSession();
    // this.getScreenPermissionOnStart();
    this.isLoggedin$ = this.authService.isUserLoggedIn();
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG),
    );
    this.selectedLanguage.set(
      this.langs.find((ele) => ele.value === this.currentLanguage()),
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  changeLanguage(lang: any) {
    this.selectedLanguage.set(lang.value);
    this.getFusionHelper().changeAppDefaultLanguage(
      LocalStorageKeys.APP_LANG,
      lang.value.value,
    );
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
        this.getLocalStorage().removeSession(LocalStorageKeys.APP_TREE);
        this.getRouter.navigate(['/auth/login']);
      });
  }

  async onRoleChange(e: any) {
    const role = e.value;
    this.localStorageService.setSessionStorage(
      LocalStorageKeys.APP_USER_SELECTED_ROLE,
      role,
    );
    // try {
    //   const treeData = (await this.lookupService.getTreeOfPages(role)).result;
    //   console.log(treeData);
    //   this.getMenuService.setModuleScreenPermission(treeData);
    //   const moduleSbmoduleList = treeData.modulesSubmodule;
    //   const screensList = treeData.screens;
    //   this.getpermissionService().addPermission([...moduleSbmoduleList, ...screensList]);

    //   console.log('start set data');

    //   this.lookupService.setTreeMenudata(treeData);
    //   this.localStorageService.setSessionStorage(LocalStorageKeys.APP_TREE, treeData);
    //   this.getRouter().navigate(['/dashboard']);
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 200);
    // } catch (error) {}
  }

  showHideHeaderNotificataion() {
    this.showHeaderNotification = !this.showHeaderNotification;
    if (this.showHeaderWidget) {
      this.showHeaderWidget = false;
    }
  }

  showHideHeaderWidget() {
    this.showHeaderWidget = !this.showHeaderWidget;
    if (this.showHeaderNotification) {
      this.showHeaderNotification = false;
    }
  }
}
