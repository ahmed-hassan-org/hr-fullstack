import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { HrSignupBackButtonComponent } from '@hrShared/atoms/hr-back-button/hr-signup-back-button.component';
import { SubtitleComponent } from '@hrShared/atoms/subtitle/subtitle.component';
import { Title1Component } from '@hrShared/atoms/title1/title1.component';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { RtlDirective } from '@wapelSharedLib/shared/directives/rtl.directive';
import { FormValidationErrorComponent } from '../../../../../../../../libs/wapel-lib/src/lib/shared/UI-Components/form-validation-error/form-validation-error.component';
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedWapelModule,
    Title1Component,
    SubtitleComponent,
    HrSignupBackButtonComponent,
    RtlDirective,
    FormValidationErrorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupModule {}
