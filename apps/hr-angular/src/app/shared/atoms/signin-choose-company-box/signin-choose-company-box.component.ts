import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';

@Component({
  selector: 'hr-signin-choose-company-box',
  standalone: true,
  imports: [CommonModule, SharedWapelModule],
  templateUrl: './signin-choose-company-box.component.html',
  styleUrls: ['./signin-choose-company-box.component.scss'],
})
export class SigninChooseCompanyBoxComponent {
  @Input() companyDetailsModel!: any;
  @Input() onSelectFn!: any;
}
