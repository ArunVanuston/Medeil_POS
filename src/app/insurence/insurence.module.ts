import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import {NgxPaginationModule} from 'ngx-pagination';
// import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

import { RightPanelModule } from 'app/rightpanel/rightpanel.module';

// import { Http } from '@angular/http';
import { insurenceRoutes } from './insurence.routing';
import { SharedModule } from 'app/shared/shared.module';

import { InsurenceComponent } from './insurencesave/insurence.component';
import { InsurenceviewComponent } from './insurenceview/insurenceview.component';
import { InsurenceeditComponent } from './insurenceedit/insurenceedit.component';
import { FilterPipe } from './insurenceview/insurenceView.pipe';


// export function createTranslateLoader(http: Http) {
//   return new TranslateStaticLoader(http, 'assets/i18n', '.json');
// }

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(insurenceRoutes),
    SharedModule,
    RightPanelModule,
    NgxPaginationModule,
   
    // TranslateModule.forRoot({
    //   provide: TranslateLoader,
    //   useFactory: (createTranslateLoader),
    //   deps: [Http]
    // })
  ],//CategoryPipe
  declarations: [  InsurenceComponent, InsurenceviewComponent,FilterPipe, InsurenceeditComponent ]
})

export class insurenceModule { }
