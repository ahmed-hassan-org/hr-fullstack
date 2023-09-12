import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
  selector: 'hr-company-profile-sidebar',
  templateUrl: './company-profile-sidebar.component.html',
  styleUrls: ['./company-profile-sidebar.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class CompanyProfileSidebarComponent {}
