import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import {hqReportServices} from './hqreport.service';
import {hqreportRoutes} from './hqreport.routing';
import {HqreportComponent} from './hqreport.component';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(hqreportRoutes),
    SharedModule
  ],
  declarations: [HqreportComponent],
 providers: [hqReportServices]
})
export class hqReportModule { }
