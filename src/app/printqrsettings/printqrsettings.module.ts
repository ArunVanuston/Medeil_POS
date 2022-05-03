import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PrintqrSettingRoutes } from './printqrsettings.routing';
import { PrintsettingsComponent } from './printsettings/printsettings.component';
import { PrintqrSettingService } from './printqrsettings.service';
import { PrintsettingsviewComponent } from './printsettingsview/printsettingsview.component';
import { PrintsettingssaveComponent } from './printsettingssave/printsettingssave.component';
import { PrintimagesaveComponent } from './printimagesave/printimagesave.component';
import { PrintimageviewComponent } from './printimageview/printimageview.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http'; 

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PrintqrSettingRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  
  declarations: [PrintsettingsComponent, PrintsettingsviewComponent, PrintsettingssaveComponent, PrintimagesaveComponent, PrintimageviewComponent],
  providers: [PrintqrSettingService, NotificationsComponent]
})

export class PrintqrsettingsModule { }
