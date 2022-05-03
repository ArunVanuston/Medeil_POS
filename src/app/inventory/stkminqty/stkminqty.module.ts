import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { stkminqtyRoutes } from './stkminqty.routing';

import { stkminqtySaveComponent } from './stkminqtySave/stkminqtySave.component';


import { stkminqtyEditComponent } from './stkminqtyEdit/stkminqtyEdit.component';

import { stkminqtyViewComponent } from './stkminqtyView/stkminqtyView.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { viewWantedBookComponent } from './viewWantedBookEntries/viewWantedBookEntries.component';
//import { CategoryPipe } from './viewWantedBookEntries/viewWantedBookEntries.pipe';
import { CategoryPipe } from './stkminqtyView/stkminqtyView.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(stkminqtyRoutes),
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [stkminqtySaveComponent, stkminqtyEditComponent, stkminqtyViewComponent,
    viewWantedBookComponent, CategoryPipe]
})

export class stkminqtyModule { }
