import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { customerRoutes } from './customer.routing';

import { custSaveComponent } from './custSave/custSave.component'  ;

import { custEditComponent } from './custEdit/custEdit.component'  ;

import { custViewComponent } from './custView/custView.component' ;

//import { CategoryPipe } from   './custView/custView.pipe'; 
import { FilterPipe } from './custView/custView.pipe';

import {NgxPaginationModule} from 'ngx-pagination';

import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { RefillcustviewComponent } from './refillcustview/refillcustview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    SharedModule,
    RightPanelModule,
    NgxPaginationModule
  ],//CategoryPipe
  declarations: [custSaveComponent  , custEditComponent,  custViewComponent, FilterPipe, RefillcustviewComponent ]
})

export class customerModule { }
