import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { GridContainerComponent } from '@wapelSharedLib/shared/UI-Components/grid-container/grid-container.component';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { AddEditEmployeesComponent } from './add-edit-employees/add-edit-employees.component';

@NgModule({
  declarations: [EmployeesComponent, AddEditEmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    GridContainerComponent,
    SharedWapelModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeesModule {}
