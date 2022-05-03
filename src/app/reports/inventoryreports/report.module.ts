import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';
import { reportComponent } from './report.component'  ;
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';

@NgModule({
  imports: [
    CommonModule,
    RightPanelModule,
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent ]
})

export class reportModule {}
