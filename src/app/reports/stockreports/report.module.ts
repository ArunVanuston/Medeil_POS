import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';
import { reportComponent } from './report.component';
import { DisposalproductsreportComponent } from './disposalproductsreport/disposalproductsreport.component';
import { ShortexpComponent } from './shortexp/shortexp.component';
import { AdjustmentstocklistComponent } from './adjustmentstocklist/adjustmentstocklist.component';
import { StockcheckinglistComponent } from './stockcheckinglist/stockcheckinglist.component';



@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent, DisposalproductsreportComponent, ShortexpComponent, AdjustmentstocklistComponent, StockcheckinglistComponent ]
})

export class reportModule {}
