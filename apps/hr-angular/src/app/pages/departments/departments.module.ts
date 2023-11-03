import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { PrimeNgModule } from '@wapelSharedLib/shared/PrimeNg.module';

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [CommonModule, DepartmentsRoutingModule, PrimeNgModule],
})
export class DepartmentsModule {}
