import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';
import { reportComponent } from './report.component'  ;
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { LoginapprovedempComponent } from './loginapprovedemp/loginapprovedemp.component';
import { hrmsReportModule } from './report.services';
import { OpenregisterComponent } from './openregister/openregister.component';
import { CloseregisterComponent } from './closeregister/closeregister.component';
import { EmpcloseregisterComponent } from './empcloseregister/empcloseregister.component';

@NgModule({
  imports: [
    CommonModule,
    RightPanelModule,
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent, LoginapprovedempComponent, OpenregisterComponent, CloseregisterComponent, EmpcloseregisterComponent ],
  providers:[hrmsReportModule]
})

export class reportModule {}
