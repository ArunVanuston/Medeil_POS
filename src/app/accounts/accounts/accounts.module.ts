import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { accountsSaveComponent } from './accountsSave/accountsSave.component' ;
import {SharedModule} from '../../shared/shared.module';
import { accountsRoutes } from './accounts.routing';
import { DxDataGridModule,
  DxSparklineModule,  
  DxTemplateModule } from 'devextreme-angular';
import { BankregComponent } from './bankreg/bankreg.component';
import { ViewbankComponent } from './viewbank/viewbank.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { ChequebookComponent } from './chequebook/chequebook.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

@NgModule({
  imports: [
    CommonModule,  DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(accountsRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [  accountsSaveComponent,BankregComponent, ViewbankComponent, ChequebookComponent]
})
export class accountsModule {}
