import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';
import { ChartModule } from 'primeng/chart';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
        DashboardsRoutingModule,
        SharedWapelModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
