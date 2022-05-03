import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { plstmtRoutes } from './plstmt.routing';
import { plstmtSaveComponent } from './plstmtSave/plstmtSave.component';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

@NgModule({
  imports: [
    CommonModule, DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(plstmtRoutes),
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [plstmtSaveComponent]
})
export class plstmtModule {}
