import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import {NgxPaginationModule} from 'ngx-pagination';
// import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

import { RightPanelModule } from 'app/rightpanel/rightpanel.module';

// import { Http } from '@angular/http';

import { SharedModule } from 'app/shared/shared.module';
import { policyRoutes } from './policy.routing';
import { PolicysaveComponent } from './policysave/policysave.component';
import { PolicyviewComponent } from './policyview/policyview.component';
import { PolicyeditComponent } from './policyedit/policyedit.component';








// export function createTranslateLoader(http: Http) {
//   return new TranslateStaticLoader(http, 'assets/i18n', '.json');
// }

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(policyRoutes),
    SharedModule,
    RightPanelModule,
    NgxPaginationModule,
   
    // TranslateModule.forRoot({
    //   provide: TranslateLoader,
    //   useFactory: (createTranslateLoader),
    //   deps: [Http]
    // })
  ],//CategoryPipe
  declarations: [ PolicysaveComponent, PolicyviewComponent, PolicyeditComponent]
})

export class policyModule { }
