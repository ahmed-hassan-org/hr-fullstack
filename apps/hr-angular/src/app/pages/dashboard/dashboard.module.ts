import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { ChartModule } from 'primeng/chart';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GridContainerComponent } from '../../../../../../libs/wapel-lib/src/lib/shared/UI-Components/grid-container/grid-container.component';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    DashboardsRoutingModule,
    SharedWapelModule,
    GridContainerComponent,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
