import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SmssettingsComponent } from './smssettings.component';
import { smssettingsRoutes } from './smssettings.routing';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(smssettingsRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ SmssettingsComponent ]
})

export class smssettingsModule { }
