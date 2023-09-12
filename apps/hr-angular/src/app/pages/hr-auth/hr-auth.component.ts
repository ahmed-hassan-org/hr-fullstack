import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';

@Component({
  selector: 'hr-hr-auth',
  templateUrl: './hr-auth.component.html',
  styleUrls: ['./hr-auth.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class HrAuthComponent extends WapelBase implements OnInit {
  override currentLanguage = signal('');
  constructor(injector: Injector) {
    super(injector);
    this.messageTranslationPrefix = '';
  }

  ngOnInit(): void {
    this.getAppLanguage();
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

  doSignIn() {
    this.getRouter.navigate(['/company-profile']);
  }

  doSignup() {
    this.getRouter.navigate(['signup'], {
      relativeTo: this.getActivatedRoute,
    });
  }
}
