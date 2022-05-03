import { Routes } from '@angular/router';
import { AccpayableComponent } from './accpayable/accpayable.component';
import { AccreceivableComponent } from './accreceivable/accreceivable.component';
import { AdjustmentreportComponent } from './adjustmentreport/adjustmentreport.component';
import { BankreportComponent } from './bankreport/bankreport.component';
import { ChartaccountComponent } from './chartaccount/chartaccount.component';
import { ChequereportComponent } from './chequereport/chequereport.component';
import { CustomerpaymentComponent } from './customerpayment/customerpayment.component';
import { CustomerreceiptComponent } from './customerreceipt/customerreceipt.component';
import { EmployeepaymentComponent } from './employeepayment/employeepayment.component';
import { EmployeereceiptComponent } from './employeereceipt/employeereceipt.component';
import { GenjournalComponent } from './genjournal/genjournal.component';
import { InvoicetypecreditComponent } from './invoicetypecredit/invoicetypecredit.component';
import { InvoicetypedebitComponent } from './invoicetypedebit/invoicetypedebit.component';
import { OtherpaymentComponent } from './otherpayment/otherpayment.component';
import { OtherreceiptComponent } from './otherreceipt/otherreceipt.component';
import { PurjournalComponent } from './purjournal/purjournal.component';
import { reportComponent } from './report.component';
import { SalesjournalComponent } from './salesjournal/salesjournal.component';
import { VendorpaymentComponent } from './vendorpayment/vendorpayment.component';
import { VendorreceiptComponent } from './vendorreceipt/vendorreceipt.component';
export const reportRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'AccountReports',
        component: reportComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'CustomerPayment',
        component: CustomerpaymentComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'EmployeePayment',
        component: EmployeepaymentComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'OtherPayment',
        component: OtherpaymentComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'VendorPayment',
        component: VendorpaymentComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'VendorReceipt',
        component: VendorreceiptComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'OtherReceipt',
        component: OtherreceiptComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'EmployeeReceipt',
        component: EmployeereceiptComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'CustomerReceipt',
        component: CustomerreceiptComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'AccountPayableReport',
        component: AccpayableComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'AccountReceivableReport',
        component: AccreceivableComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'SalesJournal',
        component: SalesjournalComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'PurchaseJournal',
        component: PurjournalComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'AdjustmentReport',
        component: AdjustmentreportComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'GeneralJournalReport',
        component: GenjournalComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'BankReport',
        component: BankreportComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'ChequeReport',
        component: ChequereportComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'InvoicewiseDebitnote',
        component: InvoicetypedebitComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'InvoicewiseCreditnote',
        component: InvoicetypecreditComponent,
        data: {
          breadcrumb: 'Reports'
        }
      },
      {
        path: 'ChartOfAccounts',
        component: ChartaccountComponent,
        data: {
          breadcrumb: 'Reports'
        }
      }
    ]
  }];
