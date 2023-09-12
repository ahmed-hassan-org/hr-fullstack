import { Component, Injector, OnInit, signal } from '@angular/core';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { SigninSteps } from '@hrPages/hr-auth/models/SigninSteps.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';

@Component({
  selector: 'hr-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class SigninComponent extends WapelBase implements OnInit {
  signupStepModel = signal(SigninSteps.ENTER_INFO);
  override currentLanguage = signal('');
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAppLanguage();
  }

  override getAppLanguage(): void {
    this.currentLanguage.set(
      this.getFusionHelper().getActiveLanguage(LocalStorageKeys.APP_LANG)
    );
    this.getTranslation()
      .onLangChange.pipe(untilDestroyed(this))
      .subscribe((lang) => {
        this.currentLanguage.set(lang?.lang);
      });
  }

  toVerifyIdentity() {
    this.signupStepModel.set(SigninSteps.SELECT_VERIFIY_OPTION);
  }

  backToMain = () => {
    this.signupStepModel.set(SigninSteps.ENTER_INFO);
  };

  toPhoneOtp() {
    this.signupStepModel.set(SigninSteps.PHONE_OTP);
  }

  backToSelectVerification = () => {
    this.signupStepModel.set(SigninSteps.SELECT_VERIFIY_OPTION);
  };

  verifyAndToDashboard() {
    this.getRouter.navigate(['/dashboard']);
  }
}
