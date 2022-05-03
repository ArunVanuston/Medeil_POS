import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../shared/shared.module';

import { pharmacistreportRoutes } from './pharmacistreport.routing';
import { PharmacistregreportComponent } from './pharmacistregreport.component';
import { pharmacistregService } from 'app/pharmacist-reg/Pharmacistreg.service';
import { pharmacistreportService } from './pharmacistreport.service';







@NgModule({
  imports: [
    CommonModule,
   
    RouterModule.forChild(pharmacistreportRoutes),
   SharedModule
  ],
  declarations: [ PharmacistregreportComponent ],
  providers: [pharmacistregService,pharmacistreportService]
})

export class pharmacistreportModule {}
