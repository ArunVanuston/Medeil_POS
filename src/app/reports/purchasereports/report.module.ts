import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';
import { reportComponent } from './report.component'  ;
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { DcreportComponent } from './dcreport/dcreport.component';
import { PurchasebarchartComponent } from './purchasebarchart/purchasebarchart.component';
import { CommongstreportComponent } from './commongstreport/commongstreport.component';
import { PurchasereturngstComponent } from './purchasereturngst/purchasereturngst.component';

@NgModule({
  imports: [
    CommonModule,
    RightPanelModule,
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent, DcreportComponent, PurchasebarchartComponent, CommongstreportComponent, PurchasereturngstComponent ]
})

export class reportModule {}
