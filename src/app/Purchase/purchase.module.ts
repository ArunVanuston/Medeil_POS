import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {purchaseRoutes} from './purchase.routing';
import {purchaseOrderComponent} from './purchaseOrder/purchaseOrder.component';
import {purchaseOrderEditComponent} from './purchaseOrderEdit/purchaseOrderEdit.component';
import {purchaseOrderViewComponent} from './purchaseOrderView/purchaseOrderView.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {CategoryPipe} from './purchaseOrderView/purchaseOrderView-list.pipe';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Http } from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(purchaseRoutes),
    SharedModule, 
    DxDataGridModule,
    DxButtonModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    RightPanelModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [purchaseOrderComponent,purchaseOrderEditComponent,purchaseOrderViewComponent,CategoryPipe]
})

export class PurchaseModule {}