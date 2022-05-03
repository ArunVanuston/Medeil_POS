import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { salesChallanRoutes } from './salesDeliveryChallan.routing';
import { salesChallanSaveComponent } from './salesChalanSave/salesChallanSave.component'; 
import { salesChallanEditcomponent } from './salesChallanEdit/salesChallanEdit.component';
import { salesChallanViewComponent } from './salesChallanView/salesChallanView.component';
import {CategoryPipe}from './salesChallanView/salesChallanView.pipe';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RightPanelModule,
    RouterModule.forChild(salesChallanRoutes),
   SharedModule
  ],
  declarations: [ salesChallanSaveComponent  , salesChallanEditcomponent   , CategoryPipe, salesChallanViewComponent ],
  

  bootstrap: [salesChallanSaveComponent]
})

export class salesDeliveryChallanModule {}
