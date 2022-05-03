import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { sjournalRoutes } from './sjournal.routing';
import { sjournalEditComponent } from './sjournalEdit/sjournalEdit.component';
import { sjournalViewComponent } from './sjournalView/sjournalView.component';
    import { CategoryPipe } from   './sjournalView/sjournalView.pipe'; 
    
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
    CommonModule,
            
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RouterModule.forChild(sjournalRoutes),
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [CategoryPipe , sjournalEditComponent ,  sjournalViewComponent]
})
export class sjournalModule {}
