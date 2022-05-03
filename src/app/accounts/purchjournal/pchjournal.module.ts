import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { pchjournalRoutes } from './pchjournal.routing';
import { purjrnlEditComponent } from './purjrnlEdit/purjrnlEdit.component';
import { purjrnlViewComponent } from './purjrnlView/purjrnlView.component';
    import { CategoryPipe } from   './purjrnlView/purjrnlView.pipe'; 
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
    RouterModule.forChild(pchjournalRoutes),
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ purjrnlEditComponent ,CategoryPipe,  purjrnlViewComponent  ]
})
export class pchjournalModule {}
