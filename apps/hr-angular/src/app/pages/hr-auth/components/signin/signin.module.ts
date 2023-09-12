import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { Title1Component } from '@hrShared/atoms/title1/title1.component';
import { HrSignupBackButtonComponent } from '@hrShared/atoms/hr-back-button/hr-signup-back-button.component';
import { SubtitleComponent } from '@hrShared/atoms/subtitle/subtitle.component';
import { RtlDirective } from '@wapelSharedLib/shared/directives/rtl.directive';
import { SigninComponent } from './signin.component';
import { SigninChooseCompanyBoxComponent } from '@hrShared/atoms/signin-choose-company-box/signin-choose-company-box.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    SharedWapelModule,
    Title1Component,
    SubtitleComponent,
    HrSignupBackButtonComponent,
    RtlDirective,
    SigninChooseCompanyBoxComponent,
  ],
})
export class SigninModule {}
