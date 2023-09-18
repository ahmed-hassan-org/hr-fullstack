import {
  Component,
  Injector,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import {
  SignupAddInfoChild,
  SignupSteps,
} from '@hrPages/hr-auth/models/SignupSteps.enum';
import { AuthService } from '@hrServices/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';
import { CustomValidation } from '@wapelSharedLib/shared/validator/CustomValidation';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'hr-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@UntilDestroy({ checkProperties: true })
export class SignupComponent extends WapelBase implements OnInit {
  separateDialCode = true;
  registerForm!: FormGroup;
  override currentLanguage = signal('');

  @ViewChild('phoneOtpForm') phoneOtpForm!: TemplateRef<any>;
  @ViewChild('emailOtpForm') emailOtpForm!: TemplateRef<any>;
  signupStepModel = signal<number>(SignupSteps.ADD_INFO);
  signupStepperModel = signal(SignupAddInfoChild.NAME_STEP);
  stepItems = signal<MenuItem[]>([
    { id: 'STEP-NAME', label: '' },
    { id: 'STEP-PASSWORD', label: '' },
  ]);
  @Input() set step(val: any) {
    if (val) {
      this.signupStepModel.set(val);
    }
  }
  constructor(injector: Injector, private authService: AuthService) {
    super(injector);
    this.messageTranslationPrefix = 'PAGES.SIGNUP-PAGE.MESSAGES.';
  }

  ngOnInit(): void {
    this.translateHeaderMenuItems(this.stepItems(), this.stepItems);
    this.getAppLanguage();
    this.createRegisterForm();
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

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          CustomValidation.startWithSpace,
          CustomValidation.isEnglishOnly,
        ],
      ],
      email: ['', [Validators.required, CustomValidation.isEmail]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  changeAddInfoIdx(e: number) {
    this.signupStepperModel.set(e);
  }

  toNameStep = () => {
    this.signupStepperModel.set(0);
  };

  toPasswordStep = () => {
    const { username, email } = this.registerForm.value;
    if (!username || !email) {
      this.registerForm.get('username')?.markAllAsTouched();
      this.registerForm.get('email')?.markAllAsTouched();
    } else {
      this.signupStepperModel.set(1);
    }
  };

  toPhoneStep = () => {
    this.signupStepModel.set(SignupSteps.ADD_INFO);
    this.signupStepperModel.set(2);
  };

  toPhoneVerification() {
    this.signupStepModel.set(SignupSteps.ENTER_PHONE_OTP);
  }

  toPhoneVerificationSuccess() {
    this.getRouter.navigate(['/auth/phone-otp-success'], {
      relativeTo: this.getActivatedRoute,
    });
  }

  toEmailVerification() {
    this.signupStepModel.set(SignupSteps.ENTER_EMAIL_VERIFICATION);
  }

  toEmailVerificationOTP() {
    this.signupStepModel.set(SignupSteps.ENTER_EMAIL_OTP);
  }

  toEmailVerificationSuccess() {
    this.signupStepModel.set(SignupSteps.ENTER_EMAIL_OTP_SUCCESS);
  }

  backToMainPage = () => {
    this.getRouter.navigate(['/auth'], { relativeTo: this.getActivatedRoute });
  };

  onPhoneOtpChange(e: any) {
    console.log(e);
  }

  doRegister() {
    const userData = this.registerForm.value;
    if (!userData.password) {
      this.registerForm.get('password')?.markAllAsTouched();
      return;
    }

    if (this.registerForm.valid) {
      this.authService
        .register(userData)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          if (data) {
            console.log(data);
            this.getAlertToaster().showToastSuccess(
              '',
              'New user created succssfully'
            );
            this.getRouter.navigate(['/auth/signin'], {
              relativeTo: this.getActivatedRoute,
            });
          }
        });
    }
  }
}
