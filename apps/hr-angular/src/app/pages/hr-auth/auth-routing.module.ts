import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneOtpSuccessComponent } from './components/signup-phone-otp-success/phone-otp-success.component';
import { SignupIntroComponent } from './components/signup-intro/signup-intro.component';
import { HrAuthComponent } from './hr-auth.component';
import { SigninPhoneOtpSuccessComponent } from './components/signin-phone-otp-success/signin-phone-otp-success.component';

const routes: Routes = [
  {
    path: '',
    component: HrAuthComponent,
    children: [
      {
        path: '',
        component: SignupIntroComponent,
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./components/signup/signup.module').then(
            (m) => m.SignupModule
          ),
      },
      {
        path: 'signin',
        loadChildren: () =>
          import('./components/signin/signin.module').then(
            (m) => m.SigninModule
          ),
      },
    ],
  },
  {
    path: 'phone-otp-success',
    component: PhoneOtpSuccessComponent,
  },
  {
    path: 'signin-phone-otp-success',
    component: SigninPhoneOtpSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
