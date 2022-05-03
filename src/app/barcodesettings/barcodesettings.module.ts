import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BarcodeSettingsService } from './barcodesettings.service';
import { BarcodesettingsComponent } from './barcodesettings.component';
import { GeneratebarcodeComponent } from './generatebarcode/generatebarcode.component';
import { BarcodeSettingsRoutes } from './barcodesettings.routing';
import { ViewbarcodeComponent } from './viewbarcode/viewbarcode.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BarcodeSettingsRoutes),
    SharedModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  
  declarations: [BarcodesettingsComponent,GeneratebarcodeComponent, ViewbarcodeComponent],
  providers: [BarcodeSettingsService, NotificationsComponent]
})

export class BarcodeSettingsModule { }
