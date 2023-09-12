import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';

@Component({
  selector: 'hr-signup-intro',
  templateUrl: './signup-intro.component.html',
  styleUrls: ['./signup-intro.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class SignupIntroComponent extends WapelBase implements OnInit {
  override currentLanguage = signal('');
  constructor(injector: Injector) {
    super(injector);
    this.messageTranslationPrefix = 'PAGES.SIGNUP-INTRO.MESSAGES.';
  }

  ngOnInit(): void {
    this.getAppLanguage();
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

  doSignIn() {
    this.getRouter.navigate(['signin'], { relativeTo: this.getActivatedRoute });
  }

  doSignup() {
    this.getRouter.navigate(['signup'], {
      relativeTo: this.getActivatedRoute,
    });
  }
}
