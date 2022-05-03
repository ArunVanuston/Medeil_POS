import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { xreportRoutes } from './xregister.routing';
import { PrintXReportComponent } from './printxreport.component';
import { CloseXRegisterComponent } from './closexregistershift.component';
import { OPenXRegisterComponent } from './openxregistershift.component';
import { XreportComponent } from './xreport/xreport.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { XSummaryComponent } from './xsummary.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(xreportRoutes),
        SharedModule,
        DxDataGridModule,
        DxButtonModule,
        NgxPaginationModule,
        RightPanelModule
    ],
    declarations: [PrintXReportComponent, CloseXRegisterComponent, OPenXRegisterComponent, XSummaryComponent, XreportComponent],
    exports: [OPenXRegisterComponent],
})

export class XRegisterModule { }