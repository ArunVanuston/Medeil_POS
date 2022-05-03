import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { debitNoteRoutes } from './debitNote.routing';
import { saveDebitNoteComponent } from './saveDebitNote/saveDebitNote.component';
import { editDebitNoteComponent } from './editDebitNote/editDebitNote.component';
import { viewDebitNoteComponent } from './viewDebitNote/viewDebitNote.component';
    import { CategoryPipe } from   './viewDebitNote/viewDebitNote.pipe' ;
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
    RouterModule.forChild(debitNoteRoutes),
    SharedModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ editDebitNoteComponent,viewDebitNoteComponent,saveDebitNoteComponent,CategoryPipe]
})
export class debitNoteModule {}
