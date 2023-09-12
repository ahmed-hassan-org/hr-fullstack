import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';

@Component({
  selector: 'hr-company-profile-page-top-header',
  standalone: true,
  imports: [CommonModule, SharedWapelModule],
  templateUrl: './company-profile-page-top-header.component.html',
  styleUrls: ['./company-profile-page-top-header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompanyProfilePageTopHeaderComponent {}
