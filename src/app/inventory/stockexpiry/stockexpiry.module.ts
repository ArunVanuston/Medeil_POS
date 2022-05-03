import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { stockexpiryRoutes } from './stockexpiry.routing';
import { stkexpSaveComponent } from './stkexpSave/stkexpSave.component';
import { stkexpEditComponent } from './stkexpEdit/stkexpEdit.component';
import { stkexpViewComponent } from './stkexpView/stkexpView.component';
import { CategoryPipe } from './stkexpView/stkexpView.pipe';
import { DxDataGridModule, DxSparklineModule, DxTemplateModule, DxPopupModule } from 'devextreme-angular';
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
    RouterModule.forChild(stockexpiryRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [   stkexpSaveComponent  , stkexpEditComponent,  CategoryPipe  ,stkexpViewComponent]
})

export class stockexpiryModule {}
