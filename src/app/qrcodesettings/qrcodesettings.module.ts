import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { QrcodeSettingsRoutes } from './qrcodesettings.routing';
import { QrcodeSettingsService } from './qrcodesettings.service';
import { QrcodesettingsComponent } from './qrcodesettings.component';
import { ViewqrcodeComponent } from './viewqrcode/viewqrcode.component';
import { GenerateqrcodeComponent } from './generateqrcode/generateqrcode.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QrcodeSettingsRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  
  declarations: [QrcodesettingsComponent,GenerateqrcodeComponent, ViewqrcodeComponent],
  providers: [QrcodeSettingsService, NotificationsComponent]
})

export class QrcodeSettingsModule { }
