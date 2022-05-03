import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { genjournalEditComponent } from './genjournalEdit/genjournalEdit.component';
import { genjournalViewComponent } from './genjournalView/genjournalView.component';
import { genjournalSaveComponent } from './genjournalSave/genjournalSave.component';
import { SharedModule } from '../../shared/shared.module';
import { genjournalRoutes } from './genjournal.routing';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
} 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(genjournalRoutes),
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [genjournalEditComponent, genjournalViewComponent, genjournalSaveComponent]
})
export class genjournalModule { }
