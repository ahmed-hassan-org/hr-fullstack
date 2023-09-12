import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { AuthRoutingModule } from './auth-routing.module';
import { HrAuthComponent } from './hr-auth.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { Title1Component } from '@hrShared/atoms/title1/title1.component';
import { SubtitleComponent } from '@hrShared/atoms/subtitle/subtitle.component';
import { HrSignupBackButtonComponent } from '@hrShared/atoms/hr-back-button/hr-signup-back-button.component';
import { RtlDirective } from '@wapelSharedLib/shared/directives/rtl.directive';
import { SignupIntroComponent } from './components/signup-intro/signup-intro.component';
import { PhoneOtpSuccessComponent } from './components/signup-phone-otp-success/phone-otp-success.component';
import { SigninPhoneOtpSuccessComponent } from './components/signin-phone-otp-success/signin-phone-otp-success.component';

@NgModule({
  declarations: [
    HrAuthComponent,
    SignupComponent,
    SignupIntroComponent,
    PhoneOtpSuccessComponent,
    SigninPhoneOtpSuccessComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedWapelModule,
    Title1Component,
    SubtitleComponent,
    HrSignupBackButtonComponent,
    RtlDirective,
  ],
})
export class AuthModule {}
