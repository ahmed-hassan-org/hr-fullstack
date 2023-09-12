import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupSteps } from '@hrPages/hr-auth/models/SignupSteps.enum';

@Component({
  selector: 'hr-phone-otp-success',
  templateUrl: './phone-otp-success.component.html',
  styleUrls: ['./phone-otp-success.component.scss'],
})
export class PhoneOtpSuccessComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  toSignupEmail() {
    this.router.navigate([`/auth/signup`], {
      relativeTo: this.activeRoute,
      // queryParams: { step: SignupSteps.ENTER_EMAIL_VERIFICATION },
      state: { step: SignupSteps.ENTER_EMAIL_VERIFICATION },
    });
  }
}
