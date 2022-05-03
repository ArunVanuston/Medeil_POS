import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { invoiceRoutes } from './purchaseInvoice.routing';
import { invoiceComponent } from './purchaseInvoice.component';
import { addinvoiceComponent } from './addPurchaseinvoice/addPurchaseinvoice.component';
import { viewinvoiceComponent } from './viewPurchaseinvoice/viewPurchaseinvoice.component';
import { editinvoiceComponent } from './editPurchaseinvoice/editPurchaseinvoice.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
//import { CategoryPipe } from './addPurchaseinvoice/addPurchaseinvoice.pipe';
/* Others  */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryPipe } from './viewPurchaseinvoice/viewPurchaseinvoice.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RightPanelModule } from 'app/rightpanel/rightpanel.module'; 
import { Http } from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(invoiceRoutes),
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    DxDataGridModule,
    DxButtonModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    RightPanelModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })

  ],
  declarations: [invoiceComponent, addinvoiceComponent, viewinvoiceComponent, editinvoiceComponent, CategoryPipe,]
})

export class invoiceModule { }