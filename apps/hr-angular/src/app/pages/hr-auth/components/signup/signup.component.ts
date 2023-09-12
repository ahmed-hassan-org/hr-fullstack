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
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import {
  SignupAddInfoChild,
  SignupSteps,
} from '@hrPages/hr-auth/models/SignupSteps.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WapelBase } from '@wapelSharedLib/core/models/classes/WapelBase';

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

  override currentLanguage = signal('');

  @ViewChild('phoneOtpForm') phoneOtpForm!: TemplateRef<any>;
  @ViewChild('emailOtpForm') emailOtpForm!: TemplateRef<any>;
  signupStepModel = signal<number>(SignupSteps.ADD_INFO);
  signupStepperModel = signal(SignupAddInfoChild.NAME_STEP);
  stepItems = signal<MenuItem[]>([
    { id: 'STEP-NAME', label: '' },
    { id: 'STEP-PASSWORD', label: '' },
    { id: 'STEP-PHONE', label: '' },
  ]);
  @Input() set step(val: any) {
    if (val) {
      this.signupStepModel.set(val);
    }
  }
  constructor(injector: Injector) {
    super(injector);
    this.messageTranslationPrefix = 'PAGES.SIGNUP-PAGE.MESSAGES.';
  }

  ngOnInit(): void {
    this.translateHeaderMenuItems(this.stepItems(), this.stepItems);
    this.getAppLanguage();
    // this.getQueryOnStart();
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

  changeAddInfoIdx(e: number) {
    this.signupStepperModel.set(e);
  }

  toNameStep = () => {
    this.signupStepperModel.set(0);
  };

  toPasswordStep = () => {
    this.signupStepperModel.set(1);
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
}
