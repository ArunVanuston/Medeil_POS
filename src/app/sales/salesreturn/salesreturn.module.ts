import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { salesreturnRoutes } from './salesreturn.routing';

import { slsRetSaveComponent } from './slsRetSave/slsRetSave.component'  ;

import { slsRetEditComponent } from './slsRetEdit/slsRetEdit.component'  ;

import { slsRetViewComponent } from './slsRetView/slsRetView.component'  ;

import { CategoryPipe } from   './slsRetView/slsRetView.pipe'; 
import {NgxPaginationModule} from 'ngx-pagination';
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
    CommonModule,DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule  ,
    RouterModule.forChild(salesreturnRoutes),
    SharedModule,
    RightPanelModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [slsRetSaveComponent,slsRetEditComponent,CategoryPipe,slsRetViewComponent ]
})

export class salesreturnModule {}
