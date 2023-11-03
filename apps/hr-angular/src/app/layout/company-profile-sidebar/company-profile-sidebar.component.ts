import { Component, signal } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
  selector: 'hr-company-profile-sidebar',
  templateUrl: './company-profile-sidebar.component.html',
  styleUrls: ['./company-profile-sidebar.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class CompanyProfileSidebarComponent {
  navLinks = signal([
    { label: 'Dashboard', icon: 'pi pi-dashboard', url: '/dashboard' },
    { label: 'Employees', icon: 'pi pi-person', url: '/employees' },
    { label: 'Departments', icon: 'pi pi-home', url: '/departments' },
  ]);
}
