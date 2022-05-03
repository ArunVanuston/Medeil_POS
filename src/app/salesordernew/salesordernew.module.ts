import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { salesOrderRoutes } from './salesordernew.routing';
import { salesOrderComponentnew } from './salesordernew.component';
import { addsalesOrderComponentnew } from './addsalesordernew/addsalesordernew.component';
import { salesOrderServicenew } from './salesordernew.services';
import { NotificationsComponent } from '../notifications/notifications.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { CategoryPipe } from './viewsalesordernew/viewsalesordernew.pipe';
import { viewSalesOrderComponentnew } from './viewsalesordernew/viewsalesordernew.component';
import { viewSalesOrderRecordComponentnew } from './viewsalesorderrecordnew/viewsalesorderrecordnew.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {editsalesOrderComponentnew} from './editsalesordernew/editsalesordernew.component';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(salesOrderRoutes),
    SharedModule,
    DxDataGridModule,
    DxButtonModule,
    NgxPaginationModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http] 
    })
  ],
  declarations: [salesOrderComponentnew, addsalesOrderComponentnew, CategoryPipe, viewSalesOrderComponentnew,viewSalesOrderRecordComponentnew,editsalesOrderComponentnew],
  providers: [salesOrderServicenew, NotificationsComponent]
})

export class salesOrderModulenew { }