import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { CountToModule } from 'angular-count-to';
import { SharedModule } from 'app/shared/shared.module';
import { DxCircularGaugeModule } from 'devextreme-angular'
import { DxBarGaugeModule, DxChartModule, DxFunnelModule } from 'devextreme-angular';
import { NgxGaugeModule } from 'ngx-gauge';
import { PurchasedashComponent } from './purchasedash/purchasedash.component';
import { SalesdashComponent } from './salesdash/salesdash.component';
import { TaskdashComponent } from './taskdash/taskdash.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule, 
    CountToModule,
    DxCircularGaugeModule,
    DxBarGaugeModule,
    DxChartModule,
    DxFunnelModule,
    NgxGaugeModule
  ],
  declarations: [DashboardComponent, PurchasedashComponent, SalesdashComponent, TaskdashComponent]
})


export class DashboardModule {
  customizeText(arg) {
    return arg.valueText + ' %';
  }
 }

