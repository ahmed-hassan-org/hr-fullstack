import { Component, Injector, OnInit, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { SigninSteps } from '@hrPages/hr-auth/models/SigninSteps.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { CustomValidation } from '../../../../../../../../libs/wapel-lib/src/lib/shared/validator/CustomValidation';
import { AuthService } from '@hrServices/auth.service';

@Component({
  selector: 'hr-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class SigninComponent extends WapelBase implements OnInit {
  signupStepModel = signal(SigninSteps.ENTER_INFO);
  loginForm!: FormGroup;
  override currentLanguage = signal('');
  constructor(injector: Injector, private authService: AuthService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAppLanguage();
    this.createLoginForm();
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

  createLoginForm() {
    this.loginForm = this.getFormBuilder.group({
      email: ['', [Validators.required, CustomValidation.isEmail]],
      password: ['', [Validators.required]],
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

  doLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService
        .login(loginData)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          const { token, roles, isOtpEnabled } = data.data;
          if (data.data) {
            if (data) {
              this.localStorageService.setSessionStorage(
                LocalStorageKeys.APP_TOKEN_SESSION,
                token
              );
              this.localStorageService.setSessionStorage(
                LocalStorageKeys.APP_USER_ROLES_PERMISSION,
                roles
              );
              this.localStorageService.setSessionStorage(
                LocalStorageKeys.APP_IS_LOGGED,
                true
              );
              if (isOtpEnabled) {
                this.toVerifyIdentity();
              } else {
                this.getRouter.navigate(['/dashboard']);
              }
            }
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
      this.getAlertToaster().showToastError(
        'Login Data alert',
        'pleasae enter your credintials'
      );
    }
  }
}
