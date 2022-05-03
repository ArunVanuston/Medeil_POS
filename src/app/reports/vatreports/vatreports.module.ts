import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { VatreportsComponent } from './vatreports.component';
import { VatreportsRoutes } from './vatreports.routing';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { purchaseReportModule } from '../purchasereports/report.services';

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(VatreportsRoutes),
        SharedModule,
        RightPanelModule
    ],
    declarations:[VatreportsComponent],
    providers:[purchaseReportModule]
})

export class VatreportsModule{}