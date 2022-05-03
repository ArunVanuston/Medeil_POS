import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';
import { reportComponent } from './report.component'  ;
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { DistwiseproductsComponent } from './distwiseproducts/distwiseproducts.component';
import { ManuwiseproductsComponent } from './manuwiseproducts/manuwiseproducts.component';
import { DistbankdetailsComponent } from './distbankdetails/distbankdetails.component';
import { vendorReportModule } from './report.services';
import { DistributorService } from 'app/regform/distributor/distributorSave/distributor.service';

@NgModule({
  imports: [
    CommonModule,
    RightPanelModule,
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent, DistwiseproductsComponent, ManuwiseproductsComponent, DistbankdetailsComponent ],
  providers:[vendorReportModule,DistributorService]
})

export class reportModule {}
