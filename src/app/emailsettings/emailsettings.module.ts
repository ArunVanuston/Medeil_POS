import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { EmailsettingsRoutes } from './emailsettings.routing';
import { EmailsettingsComponent } from './emailsettings.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http'; 

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmailsettingsRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ EmailsettingsComponent ]
})

export class emailsettingsModule { }
