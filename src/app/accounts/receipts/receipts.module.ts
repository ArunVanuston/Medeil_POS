import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { receiptSaveComponent } from './receiptSave/receiptSave.component';
import { receiptEditComponent } from './receiptEdit/receiptEdit.component' ;
import { receiptViewComponent } from './receiptView/receiptView.component'  ;
import {SharedModule} from '../../shared/shared.module';
import { receiptsRoutes } from './receipts.routing';
    import { CategoryPipe } from   './receiptView/receiptView.pipe'; 
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
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
    
    RouterModule.forChild(receiptsRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [   receiptSaveComponent  ,  receiptEditComponent  ,CategoryPipe,  receiptViewComponent ]
})
export class receiptsModule {}
