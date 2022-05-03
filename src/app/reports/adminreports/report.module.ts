import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';

import { reportComponent } from './report.component'  ;


@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent ]
})

export class reportModule {}
