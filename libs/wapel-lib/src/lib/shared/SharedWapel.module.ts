import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrimeNgModule } from './PrimeNg.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PipesModule } from './pipes/PipesModule.module';
import { NgxPrintModule } from 'ngx-print';
import { MenuModule } from 'primeng/menu';
import { NgOtpInputModule } from 'ng-otp-input';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
    NgxSpinnerModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgxPrintModule,
    MenuModule,
    NgOtpInputModule,
  ],
  exports: [
    CommonModule,
    PrimeNgModule,
    NgxSpinnerModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgxPrintModule,
    NgOtpInputModule,
  ],
})
export class SharedWapelModule {}
