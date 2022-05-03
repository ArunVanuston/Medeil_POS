import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import { SharedModule } from '../../shared/shared.module';
import { stockadjustmentRoutes } from './stockadjustment.routing';


import { stkadjSaveComponent } from './stkadjSave/stkadjSave.component';

import { stkadjEditComponent } from './stkadjEdit/stkadjEdit.component';



import { stkadjViewComponent } from './stkadjView/stkadjView.component';

import { CategoryPipe } from './stkadjView/stkadjView.pipe'; 
import {
  DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule
} from 'devextreme-angular';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}




@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RouterModule.forChild(stockadjustmentRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [CategoryPipe, stkadjSaveComponent, stkadjEditComponent, stkadjViewComponent]
})

export class stockadjustmentModule { }
