import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { creditNoteRoutes } from './creditNote.routing';
import { saveCreditComponent }  from './saveCreditNote/saveCredit.component';
import { editCreditNoteComponent } from  './editCreditNote/editCreditNote.component';
import { viewCreditNoteComponent } from   './viewCreditNote/viewCreditNote.component'
import { CategoryPipe } from   './viewCreditNote/viewCreditNote.pipe'
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
    RouterModule.forChild(creditNoteRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [  saveCreditComponent,editCreditNoteComponent,viewCreditNoteComponent , CategoryPipe]
})
export class creditNoteModule {}
