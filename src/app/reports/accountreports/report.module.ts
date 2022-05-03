import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { reportRoutes } from './report.routing';
import { reportComponent } from './report.component';
import { CustomerpaymentComponent } from './customerpayment/customerpayment.component';
import { VendorpaymentComponent } from './vendorpayment/vendorpayment.component';
import { EmployeepaymentComponent } from './employeepayment/employeepayment.component';
import { OtherpaymentComponent } from './otherpayment/otherpayment.component';
import { OtherreceiptComponent } from './otherreceipt/otherreceipt.component';
import { EmployeereceiptComponent } from './employeereceipt/employeereceipt.component';
import { CustomerreceiptComponent } from './customerreceipt/customerreceipt.component';
import { VendorreceiptComponent } from './vendorreceipt/vendorreceipt.component';
import { PurjournalComponent } from './purjournal/purjournal.component';
import { SalesjournalComponent } from './salesjournal/salesjournal.component';
import { ChartaccountComponent } from './chartaccount/chartaccount.component';
import { InvoicetypedebitComponent } from './invoicetypedebit/invoicetypedebit.component';
import { InvoicetypecreditComponent } from './invoicetypecredit/invoicetypecredit.component';
import { AdjustmentreportComponent } from './adjustmentreport/adjustmentreport.component';
import { GenjournalComponent } from './genjournal/genjournal.component';
import { AccpayableComponent } from './accpayable/accpayable.component';
import { AccreceivableComponent } from './accreceivable/accreceivable.component';
import { BankreportComponent } from './bankreport/bankreport.component';
import { ChequereportComponent } from './chequereport/chequereport.component'  ;
@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forChild(reportRoutes),
   SharedModule
  ],
  declarations: [ reportComponent, CustomerpaymentComponent, VendorpaymentComponent, EmployeepaymentComponent, OtherpaymentComponent, OtherreceiptComponent, EmployeereceiptComponent, CustomerreceiptComponent, VendorreceiptComponent, PurjournalComponent, SalesjournalComponent, ChartaccountComponent, InvoicetypedebitComponent, InvoicetypecreditComponent, AdjustmentreportComponent, GenjournalComponent, AccpayableComponent, AccreceivableComponent, BankreportComponent, ChequereportComponent ]
})
export class reportModule {}
